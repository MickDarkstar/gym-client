import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService,
        private toastr: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this.handleError(err)

            const error = err.error.message || err.statusText
            return throwError(error)
        }))
    }

    private handleError(err: any) {
        if (err.status === 400) {
            this.toastr.error(err.error.message);
        }
        if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.authenticationService.logout()
        }
        if (err.status > 200 && err.status < 400 || err.status > 500) {
            const error = err.error.message || err.statusText
            console.log(err)
            this.toastr.error(error)
        }
    }
}