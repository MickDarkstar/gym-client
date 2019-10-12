import { Injectable, OnDestroy } from '@angular/core';
import { CreateEntryDetail } from '../models/create-entry-detail.model';
import { Exercise } from '../models/exercises/exercise.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IApiResponse } from '../models/api-response.model';
import { map, take } from 'rxjs/operators';
import { Entry } from '../models/entry.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { EntryDetail } from '../models/entry-detail.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService implements OnDestroy {
  entry: BehaviorSubject<Entry> = new BehaviorSubject(null)

  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) {
    this.loadCurrentEntry()
  }

  ngOnDestroy() {
    this.entry.unsubscribe()
  }

  createEntryDetail(exercise: Exercise) {
    const entryDetail = new CreateEntryDetail()
    entryDetail.exerciseId = exercise.id
    this.http.post<IApiResponse>('entrydetails', entryDetail)
      .subscribe(result => {
        if (result.message) {
          this.toast.success(result.message)
        }
      })
  }

  deleteEntryDetail(entryDetail: EntryDetail) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: entryDetail.id
      }
    }
    return this.http.delete<IApiResponse>('entrydetails', options)
      .pipe(
        map(result => {
          return result as IApiResponse
        })
      ).subscribe(result => {
        if (result.message) {
          this.loadCurrentEntry()
          this.toast.success(result.message)
        }
      })
  }

  loadCurrentEntry(): void {
    this.http.get<IApiResponse>('currententry')
      .subscribe(result => {
        const entry = result.data as Entry;
        this.entry.next(entry)
      })
  }

  updateEntryDetail(entryDetail: EntryDetail): Observable<boolean> {
    return this.http.put<IApiResponse>('entrydetails', entryDetail)
      .pipe(
        map(result => {
          if (result.data) {
            this.toast.success('Nice work hero!', 'Exercise completed')
            return true
          }
          return false
        })
      )
  }
}
