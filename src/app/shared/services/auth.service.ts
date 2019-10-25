import { Injectable } from '@angular/core'
import * as moment from 'moment'
import { HttpClient } from '@angular/common/http'
import { User } from '@src/app/shared/models/user.model'
import { Observable, BehaviorSubject, from } from 'rxjs'
import { IApiResponse } from '@src/app/shared/models/api-response.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  public get currentIdToken(): string {
    return localStorage.getItem('id_token')
  }

  login(email: string, password: string) {
    return this.http.post<IApiResponse>('login', { email, password })
      .pipe(map(result => {
        if (result) {
          this.setSession(result.data)
        }
        return (result.data) as boolean
      })
      )
  }

  private setSession(authResultData) {
    const expiresAt = moment().add(authResultData.expiresIn, 'second')

    // Todo: Kan tas bort senare eller flyttas till currentUser
    localStorage.setItem('id_token', authResultData.jwt)
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))
    localStorage.setItem('currentUser', JSON.stringify(authResultData.user))
    this.currentUserSubject.next(authResultData.user)
  }

  logout(): void {
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
  }

  public isLoggedIn() {
    return new Observable<boolean>((observer) => {
      observer.next(
        this.isTokenNotExpired()
      )
      observer.complete()
    })
  }

  public isLoggedOut() {
    return !this.isLoggedIn()
  }

  private isTokenNotExpired() {
    return moment().isBefore(this.getExpiration())
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at')
    const expiresAt = JSON.parse(expiration)
    return moment(expiresAt)
  }
}
