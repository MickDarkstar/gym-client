import { Injectable } from '@angular/core'
import * as moment from 'moment'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../models/user.model'
import { map, take } from 'rxjs/operators'
import { Observable, Subject, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSource = new Subject<User>()
  private url = 'http://localhost/mickes-boilerplates/jwt-rest-api/login'
  currentUser = this.userSource.asObservable()

  constructor(private http: HttpClient) { }

  login() {
    const email = 'micke@tempory.org'
    const password = 'test'
    return this.http.post<any>(this.url, { email, password })
      .pipe(map(authResult => {
        if (authResult.data) {
          const user = new User()
          user.firstname = authResult.data.firstname
          user.lastname = authResult.data.lastname
          user.email = authResult.data.email

          this.userSource.next(user)

          this.setSession(authResult.data)
          return authResult.data
        }
      })
      )
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second')

    localStorage.setItem('id_token', authResult.jwt)
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))
  }

  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOut() {
    return !this.isLoggedIn()
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at')
    const expiresAt = JSON.parse(expiration)
    return moment(expiresAt)
  }
}
