import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authenticationService.currentUser;
        const token = this.authenticationService.currentIdToken;
        if (currentUser && token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            });
        } else {
            this.router.navigate(['login']);
        }

        return next.handle(request);
    }
}
