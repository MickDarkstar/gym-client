import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { RedirectService } from '../shared/services/redirect.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter()
  loggedIn = false
  userName = ''

  constructor(
    private authService: AuthService,
    private redirectService: RedirectService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(result => {
      this.userName = this.authService.currentUserValue.firstname + ' ' + this.authService.currentUserValue.lastname
      this.loggedIn = result
    })
  }

  login() {
    this.redirectService.loginPage()
  }

  logout() {
    this.authService.logout()
    this.redirectService.loginPage()
  }
}
