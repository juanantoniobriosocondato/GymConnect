import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  // Ajusta esta URL si tu puerto es distinto
  private apiUrl = 'https://localhost:7127/api/Clase'; 

  constructor(private http: HttpClient) { }

  // 1. Obtener todas las clases (Listado)
 getClases(disciplina?: string, instructor?: string, dia?: string): Observable<any[]> {
  let params = new HttpParams();
  if (disciplina) params = params.set('disciplina', disciplina);
  if (instructor) params = params.set('instructor', instructor);
  if (dia) params = params.set('dia', dia);

  return this.http.get<any[]>(this.apiUrl, { params });
}

  // 2. Obtener clases reservadas por un usuario específico (Mis Reservas)
  getMisReservas(usuarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // 3. Obtener instructores (Desde la API de Clase o Instructor)
  // Nota: Si tienes un InstructorService, lo ideal es usar ese, 
  // pero lo añadimos aquí para que no te de error el componente de lista.
  getInstructores(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7127/api/Instructor');
  }

  // 4. Obtener una clase por ID (Detalle y Edición)
  getClaseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Alias para el formulario que usaba este nombre
  getByIdAsync(id: string): Observable<any> {
    return this.getClaseById(id);
  }

  // 5. Crear Clase (POST)
  createAsync(clase: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, clase);
  }

  // 6. Actualizar Clase (PUT)
  updateAsync(clase: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${clase.id}`, clase);
  }

  // 7. Eliminar Clase (DELETE)
  deleteClase(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 8. Reservas y Cancelaciones
  reservarClase(claseId: string, usuarioId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${claseId}/reservar/${usuarioId}`, {});
  }

  cancelarReserva(claseId: string, usuarioId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${claseId}/reservar/${usuarioId}`);
  }
}