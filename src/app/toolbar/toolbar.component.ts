import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter()
  loggedIn = false
  userName = 'not logged in'
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userName = user.firstname + ' ' + user.lastname
      }
    })
  }

  login() {
    this.authService.login()
      .pipe(take(1))
      .subscribe(() => {
        this.loggedIn = this.authService.isLoggedIn()
      })
  }
}
