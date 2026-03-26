import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Instructor {
  id?: string;
  nomApe: string;
  especialidad: string;
  fotoUrl?: string;
  bio?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = 'https://localhost:7127/api/Instructor'; 

  constructor(private http: HttpClient) { }

  // Obtener todos los instructores (para el listado y los selects)
  getInstructores(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrl);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un instructor por su ID
  getById(id: string): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo instructor (POST)
  create(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(this.apiUrl, instructor);
  }

  // Actualizar un instructor (PUT)
  update(id: string, instructor: Instructor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, instructor);
  }

  // Eliminar un instructor (DELETE)
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}