import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private apiUrl = 'https://localhost:7127/api/clase'; // La URL de tu Swagger

  constructor(private http: HttpClient) {}

  getClases(disciplina?: string): Observable<any[]> {
  let params = new HttpParams();
  if (disciplina) {
    params = params.set('disciplina', disciplina);
  }
  return this.http.get<any[]>(this.apiUrl, { params });
}
}