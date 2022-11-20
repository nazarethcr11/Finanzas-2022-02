import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "../models/user";
import {UserPost} from "../models/userPost";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Endpoint
  basePath = 'https://finanzas-backend.herokuapp.com/api/v1/usuarios';

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

  authenticate(username: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.basePath}/authenticate/${username}/${password}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  create(user: UserPost): Observable<UserPost> {
    return this.http.post<UserPost>(`${this.basePath}/create`, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  delete(id: any) {
    return this.http.delete(`${this.basePath}/delete/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
