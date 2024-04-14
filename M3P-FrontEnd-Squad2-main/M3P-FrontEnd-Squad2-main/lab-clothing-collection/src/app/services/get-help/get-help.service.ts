import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY, map, catchError } from 'rxjs';
import { API_CONFIG } from 'src/app/environments/environments';
import { GetHelp } from 'src/app/interface/getHelp.interface';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

@Injectable({
  providedIn: 'root'
})
export class GetHelpService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  createHeaderToken() {
    var token = localStorage.getItem("jwt");
    httpOptions = { headers: new HttpHeaders({ "Authorization": "Bearer " + token,  "Content-Type": "application/json" }) };
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  findAll(): Observable<GetHelp[]> {
    this.createHeaderToken();
    return this.http.get<GetHelp[]>(`${API_CONFIG.baseUrl}/api/v1/GetHelp`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  findById(id: any): Observable<GetHelp> {
    this.createHeaderToken();
    return this.http.get<GetHelp>(`${API_CONFIG.baseUrl}/api/v1/GetHelp/${id}`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  create(gethelp: GetHelp): Observable<GetHelp> {
    this.createHeaderToken();
    return this.http.post<GetHelp>(`${API_CONFIG.baseUrl}/api/v1/GetHelp/createGetHelp`, gethelp, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(gethelp: GetHelp): Observable<GetHelp> {
    this.createHeaderToken();
    return this.http.put<GetHelp>(`${API_CONFIG.baseUrl}/api/v1/GetHelp/updateGetHelp/${gethelp.id}`, gethelp, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: any): Observable<GetHelp> {
    this.createHeaderToken();
    return this.http.delete<GetHelp>(`${API_CONFIG.baseUrl}/api/v1/GetHelp/deleteGetHelp/${id}`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}
