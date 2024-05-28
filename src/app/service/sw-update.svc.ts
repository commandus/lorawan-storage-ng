import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CheckForUpdateService {

  isAnyNewUpdateAvailable: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await updates.checkForUpdate();
        if (updateFound) {
            this.isAnyNewUpdateAvailable.next(true);
            console.log($localize `:@@update-available:A new version is available`);
        }
      } catch (err) {
        console.error($localize `:@@update-failed:Failed to check for updates: `, err);
      }
    });
  }
}