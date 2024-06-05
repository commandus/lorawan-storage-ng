import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CheckForUpdateService } from './sw-update.svc';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Settings } from '../model/settings';
import { Device } from '../model/device';
import { RequestChangeDevice } from '../model/request-ch-device';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { DeviceEditDialogComponent } from '../device-edit-dialog/device-edit-dialog.component';
import { JsonService } from './json.service';
import { Credentials } from '../model/credentials';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';

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
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private platform: Platform,
    private checkForUpdateService: CheckForUpdateService,
    private app: JsonService
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

  public confirmRmDevice(
    v: RequestChangeDevice): Promise<string> {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.disableClose = true;
    d.data = {
      title: 'Delete device  "' + v.value.name + ' ' + v.value.addr,
        message: 'Press <Enter> to confirm',
        value: v
    };
    const dialogRef = this.dialog.open(DialogConfirmComponent, d);
    return new Promise<string>((resolve, reject) => { 
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.yes) {
            resolve('y');
          }
        }
      );
    });
  }
  
  public showDevice(
    v: Device
  ) : Promise<string> {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      title: v.addr ? 'Device ' + v.addr : 'New device',
      message: '',
      value: v
    };
    const dialogRef = this.dialog.open(DeviceEditDialogComponent, d);
    return new Promise<string>((resolve, reject) => { 
      dialogRef.componentInstance.changed.subscribe((v: RequestChangeDevice) => {
        this.app.chDevice(v).subscribe(
          resp => {
            if (resp) {
              resolve("ok");
            }
          },
          error => {
            reject('fail');
        });    
      });
    });
  }

  public login() : Promise<string> {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      value: this.settings.credentials
    };
    const dialogRef = this.dialog.open(DialogLoginComponent, d);
    return new Promise<string>((resolve, reject) => { 
      dialogRef.componentInstance.logged.subscribe((v: Credentials) => {
        resolve('yes');
      });
      dialogRef.componentInstance.cancelled.subscribe((v: Credentials) => {
        reject('no');
      });
    });
  }

}
