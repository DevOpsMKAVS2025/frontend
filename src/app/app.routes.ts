import { Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { GuestRequestReservationComponent } from './modules/guest-request-reservation/guest-request-reservation.component';
import { HostRequestReservationComponent } from './modules/host-request-reservation/host-request-reservation.component';
import { LoginPageComponent } from './modules/login-page/login-page.component';
import { SignupPageComponent } from './modules/signup-page/signup-page.component';
import { AccountPageComponent } from './modules/account-page/account-page.component';
import { RatingComponent } from './modules/rating/rating.component';
import { SearchAccommodationComponent } from './modules/accommodation/search-accommodation/search-accommodation.component';
import { HostAccommodationComponent } from './modules/accommodation/host-accommodation/host-accommodation.component';
import { AccommodationDetailsComponent } from './modules/accommodation/accommodation-details/accommodation-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'guest/:type', component: GuestRequestReservationComponent },
  { path: 'host/:type', component: HostRequestReservationComponent },
  { path: 'rating', component: RatingComponent },
  { path: 'accommodations', component: SearchAccommodationComponent},
  { path: 'accommodations/host', component: HostAccommodationComponent},
  { path: 'accommodation-details/:id', component: AccommodationDetailsComponent},
  { path: '**', component: LandingPageComponent },
];
