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
  private url = 'http://localhost/gym-api/login'

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentIdToken(): string {
    return localStorage.getItem('id_token')
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.url, { email, password })
      .pipe(map(authResult => {
        if (authResult.data) {

          return this.setSession(authResult.data).subscribe(() => {
            return this.currentUserValue
          })
        }
      })
      )
  }

  private setSession(authResultData): Observable<boolean> {
    const expiresAt = moment().add(authResultData.expiresIn, 'second')

    // Kan tas bort senare eller flyttas till user
    localStorage.setItem('id_token', authResultData.jwt)
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))
    localStorage.setItem('currentUser', JSON.stringify(authResultData.user))
    this.currentUserSubject.next(authResultData.user)

    return new Subject<true>();
  }

  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('currentUser')

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
