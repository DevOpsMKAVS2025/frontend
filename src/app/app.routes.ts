import { Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { GuestRequestReservationComponent } from './modules/guest-request-reservation/guest-request-reservation.component';

export const routes: Routes = [
    { path: 'guest/:type', component: GuestRequestReservationComponent },
    { path: '**', component: LandingPageComponent }
];
