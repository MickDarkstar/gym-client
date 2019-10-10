import { Injectable } from '@angular/core';
import { CreateEntryDetail } from '../models/create-entry-detail.model';
import { Exercise } from '../models/exercises/exercise.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IApiResponse } from '../models/api-response.model';
import { map, take } from 'rxjs/operators';
import { Entry } from '../models/entry.model';
import { Observable } from 'rxjs';
import { EntryDetail } from '../models/entry-detail.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  constructor(private http: HttpClient, private toast: ToastrService) { }

  createEntryDetail(exercise: Exercise) {
    const entryDetail = new CreateEntryDetail()
    entryDetail.exerciseId = exercise.id
    this.http.post<IApiResponse>('entrydetails', entryDetail)
      .pipe(take(1))
      .subscribe(result => {
        if (result.message) {
          this.toast.success(result.message)
        }
      })
  }

  getCurrentEntry(): Observable<Entry> {
    return this.http.get<IApiResponse>('currententry')
      .pipe(
        map(result => {
          return result.data as Entry
        })
      )
  }

  updateEntryDetail(entryDetail: EntryDetail): Observable<IApiResponse> {
    return this.http.put<IApiResponse>('entrydetails', entryDetail)
      .pipe(
        map(result => {
          return result
        })
      )
  }
}
