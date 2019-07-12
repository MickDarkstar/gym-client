import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Exercise } from '../shared/models/exercise.model';
import { ApiResponse } from '../shared/models/response.model';
import { WorkoutService } from '../shared/services/workout.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  private url = 'http://localhost/gym-app-server/api/controllers/exercises/'

  private dataSource: Exercise[]

  constructor(private authService: AuthService, private http: HttpClient, private workoutService: WorkoutService) { }

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

        this.http.get<ApiResponse>(this.url + 'get.php', httpOptions)
          .pipe(map(result => {
            this.dataSource = result.data
          }))
          .subscribe()
      }
    })
  }

  addExercise(exercise: Exercise) {
    this.workoutService.createEntryDetail(exercise)
  }
}
