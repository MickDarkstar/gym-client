import { Component, OnInit, Input } from '@angular/core';
import { Exercise, IExercise } from 'src/app/shared/models/exercises/exercise.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { ToastrService } from 'ngx-toastr';
import { IApiResponse } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: '../create-edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {
  private state: Observable<Exercise>;
  exercise: IExercise
  title = 'Edit Exercise'

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.state = this.activatedRoute.paramMap
      .pipe(map(() =>
        this.exercise = window.history.state.data as IExercise
      ))
    this.state
      .pipe(take(1))
      .subscribe((exercise: IExercise) => {
        this.exercise = exercise
      })
  }

  save() {
    this.exerciseService.editExercise(this.exercise)
      .subscribe((result: IApiResponse) => {
        if (result) {
          this.toast.success(result.message)
        }

        // Todo: se annan kommentar
        if (result.data === true) {
          this.router.navigate(['training/exercises'])
        }
      })
  }

  cancel() {
    this.router.navigate(['training/exercises'])
  }
}
