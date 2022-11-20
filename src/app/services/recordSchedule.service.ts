import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {SchedulePost} from "../models/schedulePost";
import {Schedule} from "../models/schedule";
import {RecordSchedulePost} from "../models/recordSchedulePost";
import {RecordSchedule} from "../models/recordSchedule";

@Injectable({
  providedIn: 'root'
})
export class RecordScheduleService {

  // Endpoint
  basePath = 'https://finanzas-backend.herokuapp.com/api/v1/record-schedules';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),

  }

  constructor(private http: HttpClient) {
  }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  create(recordSchedulePost: RecordSchedulePost): Observable<RecordSchedulePost> {
    return this.http.post<RecordSchedulePost>(`${this.basePath}`, JSON.stringify(recordSchedulePost), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  getAll(): Observable<RecordSchedule[]> {
    return this.http.get<RecordSchedule[]>(`${this.basePath}`)
      .pipe(
        catchError(this.handleError));
  }


}
