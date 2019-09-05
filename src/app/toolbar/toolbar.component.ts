import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { take } from 'rxjs/operators';
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
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userName = user.firstname + ' ' + user.lastname
        this.loggedIn = this.authService.isLoggedIn()
      }
    })
    this.authService.setUserFromSession()
  }

  login() {
    this.router.navigate(['user', 'login'])
  }

  logout() {
    this.authService.logout()
    this.loggedIn = this.authService.isLoggedIn()
  }
}
