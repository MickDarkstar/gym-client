import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter()
  loggedIn = false
  userName = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userName = this.authService.currentUserValue.firstname + ' ' + this.authService.currentUserValue.lastname
      this.loggedIn = true
    }
  }

  login() {
    this.router.navigate(['user', 'login'])
  }

  logout() {
    this.authService.logout()
    this.loggedIn = this.authService.isLoggedIn()
  }
}
