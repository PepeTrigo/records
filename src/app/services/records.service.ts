import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  private recordsSource =
    'https://raw.githubusercontent.com/PepeTrigo/sample-data/master/records.json';

  constructor(private http: HttpClient) {}

  getRecords(): Observable<Object[]> {
    return this.http.get<Object[]>(this.recordsSource).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      map((records: any) => records.reduce(this.reducerByGenre, [])),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(() => new Error('test'));
  }

  private reducerByGenre(sortedByGenre: any, record: any) {
    if (!sortedByGenre.find((set: any) => set.genre === record.genre)) {
      sortedByGenre.push({ genre: record.genre, records: [record] });
    } else {
      const set = sortedByGenre.find((set: any) => set.genre === record.genre);
      set.records.push(record);
    }

    return sortedByGenre;
  }
}
