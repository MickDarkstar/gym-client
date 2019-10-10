import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercises/exercise.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {
  private state: Observable<Exercise>;
  exercise: Exercise

  constructor(
    private activatedRoute: ActivatedRoute,
    private exerciseService: ExerciseService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.state = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state.data
      ))
    this.state
      .pipe(take(1))
      .subscribe((exercise: Exercise) => {
        this.exercise = exercise
      })
  }

  save() {
    this.exerciseService.editExercise(this.exercise)
      .subscribe((result) => {
        if (result) {
          this.toast.success(result.message)
        }
      })
  }
}
