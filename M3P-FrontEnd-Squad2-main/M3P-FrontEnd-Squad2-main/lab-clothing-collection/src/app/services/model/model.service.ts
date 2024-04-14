import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { API_CONFIG } from 'src/app/environments/environments';
import { Model } from 'src/app/interface/modelClothing.interface';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

@Injectable({
  providedIn: 'root'
})
export class ModelService {

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

  findAll(): Observable<Model[]> {
    this.createHeaderToken();
    return this.http.get<Model[]>(`${API_CONFIG.baseUrl}/api/v1/ModelClothing`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  findById(id: any): Observable<Model> {
    this.createHeaderToken();
    return this.http.get<Model>(`${API_CONFIG.baseUrl}/api/v1/ModelClothing/${id}`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  create(collection: Model): Observable<Model> {
    this.createHeaderToken();
    return this.http.post<Model>(`${API_CONFIG.baseUrl}/api/v1/ModelClothing/createModel`, collection, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(model: Model): Observable<Model> {
    this.createHeaderToken();
    return this.http.put<Model>(`${API_CONFIG.baseUrl}/api/v1/ModelClothing/updateModel/${model.id}`, model, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: any): Observable<Model> {
    this.createHeaderToken();
    return this.http.delete<Model>(`${API_CONFIG.baseUrl}/api/v1/ModelClothing/deleteModel/${id}`, httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

 getModelForChart(): Observable<any> {
    return this.findAll().pipe(
      map(models => {
        const datasets = [
          { data: models.map(_model => _model.cost), label: 'Custo dos Modelos Agregados' },
        ];

        const labels = models.map(_model => _model.name);

        return { datasets, labels };
      }),
      catchError((e) => this.errorHandler(e))
    );
  }

  getTotalCostByCollectionId(): Observable<any> {
      this.createHeaderToken();
      return this.http.get<{ idCCollection: number, cost: number }[]>(`${API_CONFIG.baseUrl}/api/v1/ModelClothing/`, httpOptions).pipe(

        map((data) => {
          const totalCostByCollectionId: { idCCollection: number, totalCost: number }[] = [];
          data.forEach((model) => {
            const existingEntry = totalCostByCollectionId.find(entry => entry.idCCollection === model.idCCollection);
            if (existingEntry) {
              existingEntry.totalCost += model.cost;
            } else {
              totalCostByCollectionId.push({ idCCollection: model.idCCollection, totalCost: model.cost });
            }
          });

          const datasets = [ { data: totalCostByCollectionId.map(entry => entry.totalCost), label: 'Custo Total por Coleção' }, ];
          const labels = totalCostByCollectionId.map(entry => entry.idCCollection.toString());

          return { datasets, labels };
        }),
        catchError((e) => this.errorHandler(e))
      );
    }
  }
