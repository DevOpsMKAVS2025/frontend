import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../env/environment";
import {AccessTokenResponse, LoginCredentials, Principal, SignupData} from "../models/user";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'

})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
    this.loadUser();
    this.user.subscribe(val => console.log(val));
  }
  user: BehaviorSubject<Principal | undefined> = new BehaviorSubject<Principal | undefined>(undefined);

  setToken(data: AccessTokenResponse) {
    localStorage.setItem('token', data.accessToken);
  }
  clearToken() {
    localStorage.clear();
    sessionStorage.clear();
  }
  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }
  loadUser() {
    const helper = new JwtHelperService();
    const token: string | null = this.getAccessToken();
    if (token == null) {
      this.user.next(undefined);
      return;
    }
    const decodedToken = helper.decodeToken(token);
    const id: string = decodedToken.nameid;
    const email: string = decodedToken.email;
    const username: string = decodedToken.unique_name;
    const role: string = decodedToken.role
    const principal: Principal = {
      id: id,
      email: email,
      role: role,
      username: username
    }
    this.user.next(principal);
  }

  loginUser(credentials: LoginCredentials): Observable<AccessTokenResponse> {
    return this.http.post<AccessTokenResponse>(`${environment.authService}auth/login`, credentials);
  }

  logOut() {
    this.clearToken();
    this.user.next(undefined);
    this.router.navigate([""])
  }

  signUp(signupData: SignupData): Observable<any> {
    return this.http.post(`${environment.authService}account`, signupData);
  }

  updateAccountInformation(data: {value: string, property: string}): Observable<any> {
    return this.http.put(`${environment.authService}account`, data);
  }

  getAccountInformation(): Observable<any> {
    return this.http.get(`${environment.authService}account`);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${environment.authService}account`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.authService}user`);
  }
}
