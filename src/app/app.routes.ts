import { Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { GuestRequestsTableComponent } from './modules/request/guest-requests-table/guest-requests-table.component';

export const routes: Routes = [
    { path: 'guest-requests', component: GuestRequestsTableComponent },
    { path: '**', component: LandingPageComponent }
];
