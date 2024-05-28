import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'device', component: DeviceListComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent }
];
