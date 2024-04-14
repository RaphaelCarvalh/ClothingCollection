import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/environments/environments';
import { User } from 'src/app/interface/user.interface';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  createHeaderToken() {
    var token = localStorage.getItem("jwt");
    httpOptions = { headers: new HttpHeaders({ "Authorization": "Bearer " + token,  "Content-Type": "application/json" }) };
  }

  createManagerHeaderToken() {
    httpOptions = { headers: new HttpHeaders({ "Authorization": "Bearer ",  "Content-Type": "application/json" }) };
  }

  findAll(): Observable<User[]> {
    this.createHeaderToken();
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/api/v1/User`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  create(user: User): Observable<User> {
    this.createHeaderToken();
    return this.http.post<User>(`${API_CONFIG.baseUrl}/api/v1/User/userCreate`, user, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  createManager(user: User): Observable<User> {
    this.createManagerHeaderToken();
    return this.http.post<User>(`${API_CONFIG.baseUrl}/api/v1/Authorize/managerCreate`, user, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  findById(id: any): Observable<User> {
    this.createHeaderToken();
    return this.http.get<User>(`${API_CONFIG.baseUrl}/api/v1/User/${id}`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(user: User): Observable<User> {
    this.createHeaderToken();
    return this.http.put<User>(`${API_CONFIG.baseUrl}/api/v1/User/userUpdate/${user.id}`, user, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  updateType(user: User): Observable<User> {
    this.createHeaderToken();
    return this.http.put<User>(`${API_CONFIG.baseUrl}/api/v1/User/userUpdate/type/${user.id}`, user, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: any): Observable<User> {
    this.createHeaderToken();
    return this.http.delete<User>(`${API_CONFIG.baseUrl}/api/v1/User/userDelete/${id}`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}

