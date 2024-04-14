import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { API_CONFIG } from 'src/app/environments/environments';
import { User } from 'src/app/interface/user.interface';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

@Injectable({
  providedIn: 'root'
})

export class PerfilService {

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

  updatePassword(user: User): Observable<User> {
    this.createHeaderToken();
    return this.http.put<User>(`${API_CONFIG.baseUrl}/api/v1/User/userUpdate/password/${user.id}`, user, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}
