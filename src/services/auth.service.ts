import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7127/api/Usuario';
  private currentUserSubject: BehaviorSubject<any>;

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Inyectamos el ID de la plataforma
  ) {
    // Solo accedemos al localStorage si estamos en el navegador
    let savedUser = null;
    if (isPlatformBrowser(this.platformId)) {
      savedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
    this.currentUserSubject = new BehaviorSubject<any>(savedUser);
  }

  // Actualiza también tus otros métodos que usen localStorage:
  
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('currentUser');
    }
    return false;
  }

  getUserName(): string {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      return user.nombre || 'Usuario';
    }
    return '';
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  registrar(usuario: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/registrar`, usuario);

  }


  login(credenciales: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/login`, credenciales).pipe(

      tap(user => {

        localStorage.setItem('currentUser', JSON.stringify(user));

        this.currentUserSubject.next(user);

      })

    );

  }
}