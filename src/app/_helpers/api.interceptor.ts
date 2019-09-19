import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiUrl = environment.apiUrl
        console.log('req url:' + req.url);
        console.log('api url:' + apiUrl);

        const apiRequest = req.clone({ url: `${apiUrl}${req.url}` })
        return next.handle(apiRequest)
    }
}
