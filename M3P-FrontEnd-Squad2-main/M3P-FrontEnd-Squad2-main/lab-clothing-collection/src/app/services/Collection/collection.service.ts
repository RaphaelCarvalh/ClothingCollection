import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, catchError, forkJoin, map } from 'rxjs';
import { API_CONFIG } from 'src/app/environments/environments';
import { Collection } from 'src/app/interface/clothingCollection.interface';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

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

  findAll(): Observable<Collection[]> {
    this.createHeaderToken();
    return this.http.get<Collection[]>(`${API_CONFIG.baseUrl}/api/v1/ClothingCollections`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  findById(id: any): Observable<Collection> {
    this.createHeaderToken();
    return this.http.get<Collection>(`${API_CONFIG.baseUrl}/api/v1/ClothingCollections/${id}`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  create(collection: Collection): Observable<Collection> {
    this.createHeaderToken();
    return this.http.post<Collection>(`${API_CONFIG.baseUrl}/api/v1/ClothingCollections/createCollection`, collection, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(collection: Collection): Observable<Collection> {
    this.createHeaderToken();
    return this.http.put<Collection>(`${API_CONFIG.baseUrl}/api/v1/ClothingCollections/updateCollection/${collection.id}`, collection, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: any): Observable<Collection> {
    this.createHeaderToken();
    return this.http.delete<Collection>(`${API_CONFIG.baseUrl}/api/v1/ClothingCollections/deleteCollection/${id}`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  getCollectionDataForChart(): Observable<any> {
    return this.findAll().pipe(
      map(collections => {
        const datasets = [
          { data: collections.map(collection => collection.budget), label: 'Orçamento das coleções' },
        ];
        const labels = collections.map(collection => collection.name);
        return { datasets, labels };
      }),
      catchError((e) => this.errorHandler(e))
    );
  }
}
