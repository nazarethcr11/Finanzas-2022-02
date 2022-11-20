import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {SchedulePost} from "../models/schedulePost";
import {Schedule} from "../models/schedule";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  // Endpoint
  basePath = 'https://finanzas-backend.herokuapp.com/api/v1/schedules';

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

  create(schedule: SchedulePost): Observable<SchedulePost> {
    return this.http.post<SchedulePost>(`${this.basePath}`, JSON.stringify(schedule), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  getAll(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.basePath}`)
      .pipe(
        catchError(this.handleError));
  }

  range(initialId: number, finalId: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.basePath}/range/${initialId}/${finalId}`)
      .pipe(
        catchError(this.handleError));
  }

}
