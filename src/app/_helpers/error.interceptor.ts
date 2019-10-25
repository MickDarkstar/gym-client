import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService,
        private toastr: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(err => {
                const error = err.error.message || err.statusText

                this.feedbackToUser(error)

                this.handleError(err)

                return throwError(error)
            }))
    }

    private handleError(err: any) {
        if (err.status === 401) {
            // logga ut, token har gått ut eller användare ej inloggad och navigerat via url.
            // returnUrl måste hänga med på något sätt här, töms om denna logout() används
            // this.authenticationService.logout()
        }
    }

    private feedbackToUser(error: any) {
        if (error instanceof Array) {
            error.forEach(message => {
                let errorMessage = ''
                Object.keys(message).forEach(
                    key => {
                        errorMessage = key as any + ': ' + message[key]
                    })
                this.toastr.error(errorMessage)
            })
        } else {
            this.toastr.error(error)
        }
    }
}
