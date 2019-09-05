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
  private url = 'http://localhost/gym-api/login'
  currentUser = this.userSource.asObservable()

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(this.url, { email, password })
      .pipe(map(authResult => {
        if (authResult.data) {

          return this.setSession(authResult.data).subscribe(() => {
            const user = new User()
            user.id = authResult.data.user.id
            user.firstname = authResult.data.user.firstname
            user.lastname = authResult.data.user.lastname
            user.email = authResult.data.user.email
            this.userSource.next(user)

            return user
          })
        }
      })
      )
  }

  public setUserFromSession() {
    if (localStorage.getItem('appUserId')) {
      const user = new User()
      user.id = Number(localStorage.getItem('appUserId'))
      user.firstname = localStorage.getItem('appUserFirstname')
      user.lastname = localStorage.getItem('appUserLastname')
      user.email = localStorage.getItem('appUserEmail')
      this.userSource.next(user)
    }
  }

  private setSession(authResultData): Observable<boolean> {
    const expiresAt = moment().add(authResultData.expiresIn, 'second')

    localStorage.setItem('id_token', authResultData.jwt)

    localStorage.setItem('appUserId', authResultData.user.id)
    localStorage.setItem('appUserFirstname', authResultData.user.firstname)
    localStorage.setItem('appUserLastname', authResultData.user.lastname)
    localStorage.setItem('appUserEmail', authResultData.user.email)

    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))
    return new Subject<true>();
  }

  logout() {
    localStorage.removeItem('appUserId')
    localStorage.removeItem('appUserFirstname')
    localStorage.removeItem('appUserLastname')
    localStorage.removeItem('appUserEmail')

    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userSource.next()
    return true
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
