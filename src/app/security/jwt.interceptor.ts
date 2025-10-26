import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('skip')) {
      const cloned = req.clone({ headers: req.headers.delete('skip') })
      return next.handle(cloned);
    }
    const accessToken: any = this.userService.getAccessToken();

    if (accessToken) {
      const helper = new JwtHelperService();
      const tokenType = helper.decodeToken(accessToken).type;
      const cloned = req.clone({
        headers: req.headers.set('authorization', tokenType + " " + accessToken),
      });

      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse &&
            !cloned.url.includes('user/login') &&
            error.status == 401) {
            this.router.navigate(['/']);
          }
          return throwError(() => error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
