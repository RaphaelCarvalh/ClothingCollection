import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { API_CONFIG } from 'src/app/environments/environments';
import { User } from 'src/app/interface/user.interface';
import { UserLogin } from 'src/app/interface/userLogin.interface';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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
    this.showMessage('E-mail e/ou senha inválidos', true);
    return EMPTY;
  }

  createHeaderToken() {
    var token = localStorage.getItem("jwt");
    httpOptions = { headers: new HttpHeaders({ "Authorization": "Bearer " + token,  "Content-Type": "application/json" }) };
  }

  createUserHeaderToken() {
    httpOptions = { headers: new HttpHeaders({ "Authorization": "Bearer ",  "Content-Type": "application/json" }) };
  }

  Login(userLogin: any): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${API_CONFIG.baseUrl}/api/v1/Authorize/login`, userLogin).pipe(
      catchError((e) => this.errorHandler(e))
    );
  }

  findAll(): Observable<User[]> {
    this.createHeaderToken();
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/api/v1/Authorize/users`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}
