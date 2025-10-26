import { Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { GuestRequestReservationComponent } from './modules/guest-request-reservation/guest-request-reservation.component';
import { HostRequestReservationComponent } from './modules/host-request-reservation/host-request-reservation.component';
import { LoginPageComponent } from './modules/login-page/login-page.component';
import { SignupPageComponent } from './modules/signup-page/signup-page.component';
import { AccountPageComponent } from './modules/account-page/account-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'guest/:type', component: GuestRequestReservationComponent },
  { path: 'host/:type', component: HostRequestReservationComponent },
  { path: '**', component: LandingPageComponent },
];
