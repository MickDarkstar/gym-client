import { Injectable } from '@angular/core';
import { CreateEntryDetail } from '../models/create-entry-detail.model';
import { Exercise } from '../models/exercise.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/response.model';
import { map } from 'rxjs/operators';
import { Entry } from '../models/entry.model';
import { Observable } from 'rxjs';
import { EntryDetail } from '../models/entry-detail.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  constructor(private http: HttpClient) { }

  createEntryDetail(exercise: Exercise) {
    const entryDetail = new CreateEntryDetail()
    entryDetail.exerciseId = exercise.id
    this.http.post<ApiResponse>('entrydetails', entryDetail)
      .pipe(map(result => {
        if (result.message) {
          // Todo: toaster(result.message);
        }
      })
      ).subscribe()
  }

  getCurrentEntry(): Observable<Entry> {
    return this.http.get<ApiResponse>('currententry').pipe(map(result => {
      return result.data as Entry
    })
    )
  }

  saveEntry(entry: Entry): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('entries', entry).pipe(map(result => {
      return result
    })
    )
  }

  saveEntryDetail(entryDetail: EntryDetail): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('entrydetails', entryDetail).pipe(map(result => {
      return result
    })
    )
  }
}
