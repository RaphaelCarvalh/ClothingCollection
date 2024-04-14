import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { API_CONFIG } from 'src/app/environments/environments';
import { Company } from 'src/app/interface/company.interface';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

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

  editHeaderToken() {
    var token = localStorage.getItem("jwt");
    httpOptions = { headers: new HttpHeaders({ "Authorization": "Bearer " + token,  "Content-Type": "application/json" }) };
  }

  createHeaderToken() {
    httpOptions = { headers: new HttpHeaders({ "Authorization": "Bearer ",  "Content-Type": "application/json" }) };
  }

  findAll(): Observable<Company[]> {
    this.createHeaderToken();
    console.log(httpOptions.headers);
    return this.http.get<Company[]>(`${API_CONFIG.baseUrl}/api/v1/Authorize/companies`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  findById(id: any): Observable<Company> {
    this.createHeaderToken();
    console.log(httpOptions.headers);
    return this.http.get<Company>(`${API_CONFIG.baseUrl}/api/v1/Authorize/getCompanyById/${id}`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  findByIdAu(id: any): Observable<Company> {
    this.editHeaderToken();
    console.log(httpOptions.headers);
    return this.http.get<Company>(`${API_CONFIG.baseUrl}/api/v1/Company/getCompanyById/${id}`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  create(company: Company): Observable<Company> {
    return this.http.post<Company>(`${API_CONFIG.baseUrl}/api/v1/Authorize/companyCreate`, company, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(company: Company): Observable<Company> {
    this.editHeaderToken();
    return this.http.put<Company>(`${API_CONFIG.baseUrl}/api/v1/Company/updateCompany/${company.id}`, company, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}
