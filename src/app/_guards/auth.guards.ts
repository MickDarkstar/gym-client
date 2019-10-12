import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { RedirectService } from '../shared/services/redirect.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationService: AuthService,
        private redirectService: RedirectService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue
        if (currentUser) {
            // authorized so return true
            return true
        }

        // not logged in so redirect to login page with the return url
        this.redirectService.loginPageWithReturnUrl(state)
        return false
    }
}