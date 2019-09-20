import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private router: Router, private toast: ToastrService) { }
    // https://www.youtube.com/watch?v=MN2WkxPnGTo
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authenticationService.currentUser;
        const token = this.authenticationService.currentIdToken;
        if (currentUser && token) {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization-Token': `${token}`,
                // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                // Following is actually not needed, may be needed in prob. We will see...
                // 'Access-Control-Allow-Headers':
                //     'Content-Type, Authorization, Authorization-Token' +
                //     'Accept, X-Requested-With, ' +
                //     'Access-Control-Request-Method, Access-Control-Request-Headers'
            });
            request = request.clone({
                headers
            })
        }
        return next.handle(request);
    }
}
