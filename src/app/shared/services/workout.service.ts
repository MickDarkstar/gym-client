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
  private url = 'http://localhost/gym-app-server/api/controllers/'
  constructor(private http: HttpClient) { }

  createEntryDetail(exercise: Exercise) {
    // Todo: move this.url and httpOptions to interceptor
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('id_token')
      }),
      withCredentials: false
    }

    const entryDetail = new CreateEntryDetail()
    entryDetail.exerciseId = exercise.id
    this.http.post<ApiResponse>(this.url + 'entry/create.php', entryDetail, httpOptions)
      .pipe(map(result => {
        if (result.message === 'saved') {
          alert('exercise saved')
        }
      })
      ).subscribe()
  }

  getCurrentEntry(): Observable<Entry> {
    // Todo: move this.url and httpOptions to interceptor
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('id_token')
      }),
      withCredentials: false
    }

    return this.http.get<ApiResponse>(this.url + 'entry/current-entry.php', httpOptions).pipe(map(result => {
      return result.data as Entry
    })
    )
  }

  saveEntry(entry: Entry): Observable<ApiResponse> {
    // Todo: move this.url and httpOptions to interceptor
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('id_token')
      }),
      withCredentials: false
    }

    return this.http.post<ApiResponse>(this.url + 'entry/update-entry.php', entry, httpOptions).pipe(map(result => {
      return result
    })
    )
  }

  saveEntryDetail(entryDetail: EntryDetail): Observable<ApiResponse> {
    // Todo: move this.url and httpOptions to interceptor
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('id_token')
      }),
      withCredentials: false
    }

    return this.http.post<ApiResponse>(this.url + 'entry/update-entry-detail.php', entryDetail, httpOptions).pipe(map(result => {
      return result
    })
    )
  }
}
