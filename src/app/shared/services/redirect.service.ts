import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(
    private router: Router,
  ) { }

  loginPage(): void {
    this.router.navigate(['user/login'])
  }

  loginPageWithReturnUrl(state: RouterStateSnapshot): void {
    this.router.navigate(['user/login'], { queryParams: { returnUrl: state.url } })
  }
}
