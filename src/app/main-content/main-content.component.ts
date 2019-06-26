import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  private url = 'http://localhost/gym-app-server/api/controllers/entry/'

  private dataSource = new Subject<any>()

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(() => {
      if (this.authService.isLoggedIn()) {

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('id_token')
          }),
          withCredentials: false
        }

        this.http.get<any>(this.url + 'get.php', httpOptions)
          .pipe(map(result => {
            this.dataSource = result.data
          }))
          .subscribe()
      }
    })
  }

}
