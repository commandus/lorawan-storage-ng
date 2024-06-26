import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { QrListComponent } from './qr-list/qr-list.component';

export const routes: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'device', component: DeviceListComponent },
    { path: 'device/:addr', component: DeviceEditComponent },
    { path: 'qr', component: QrListComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent }
];
