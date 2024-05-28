import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CheckForUpdateService } from './sw-update.svc';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Settings } from '../model/settings';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  private isNewAppAvailable: Subscription;
  public settings = new Settings(localStorage.getItem('settings'));

  private versionSubject = new BehaviorSubject<boolean>(false);
  private pwaPlatformSubject = new BehaviorSubject<string>('');
  public isOnline = false;
  public isNewVersion = this.versionSubject.asObservable();
  public modalPwaEvent: any;
  public pwaPlatform = this.pwaPlatformSubject.asObservable();
  public installed = false;

  constructor(
    private snackbar: MatSnackBar,
    private platform: Platform,
    private checkForUpdateService: CheckForUpdateService,
    private overlayContainer: OverlayContainer
  )
  {
    this.isOnline = false;
    this.updateOnlineStatus();
    window.addEventListener('online',  this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
    this.loadModalPwa();

    this.isNewAppAvailable = checkForUpdateService.isAnyNewUpdateAvailable.subscribe((avail: boolean) => {
        if (!avail)
            return;
        const snack = this.snackbar.open(
            $localize `:@@update-available:A new version is available`,
            $localize `:@@update-do:Update`, {duration: 6000});
        snack.onAction().subscribe(() => {
            window.location.reload();
            // this.swUpdate.activateUpdate();
        });

    });
  }

  private loadModalPwa(): void {
    window.addEventListener('appinstalled', () => {
        this.installed = true;
    });
    setTimeout(() => {
        if (this.installed)
            return;
        if (this.platform.ANDROID) {
            window.addEventListener('beforeinstallprompt', (event: any) => {
                event.preventDefault();
                this.modalPwaEvent = event;
                this.pwaPlatformSubject.next('android');
            });
        }
    
        if (this.platform.IOS && this.platform.SAFARI) {
            const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
            if (!isInStandaloneMode) {
                this.pwaPlatformSubject.next('ios');
            }
        }
    }, 5000);
  }

  public addPwaToHomeScreen(): void {
      this.modalPwaEvent.prompt();
      this.pwaPlatformSubject.next('');
  }

  public closePwa(): void {
      this.pwaPlatformSubject.next('');
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
  }

}
