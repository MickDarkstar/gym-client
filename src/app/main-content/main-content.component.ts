import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Exercise } from '../shared/models/exercise.model';
import { ApiResponse } from '../shared/models/api-response.model';
import { WorkoutService } from '../shared/services/workout.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  private dataSource: Exercise[]

  constructor(private authService: AuthService, private http: HttpClient, private workoutService: WorkoutService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.http.get<ApiResponse>('exercises')
        .pipe(map(result => {
          this.dataSource = result.data
        }))
        .subscribe()
    }
  }

  addExercise(exercise: Exercise) {
    this.workoutService.createEntryDetail(exercise)
  }
}
