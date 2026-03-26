import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClassService } from '../../services/class.services';
import { AuthService } from '../../services/auth.service'; 
import { HttpClient } from '@angular/common/http';
import { UiService } from '../../services/ui.service';
import { InstructorService } from '../../services/instructor.service';

@Component({
  selector: 'app-class-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './class-detail.component.html',
  styleUrl: './class-detail.component.css'
})
export class ClassDetailComponent implements OnInit {
  claseId: string | null = null;
  clase: any = null;
  instructores: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router, 
    private classService: ClassService,
    public authService: AuthService,
    private uiService: UiService,
    private instructorService: InstructorService
  ) {}

  cargarInstructores() {
    this.instructorService.getInstructores().subscribe(data => {
    this.instructores = data;
    });
  }

  ngOnInit(): void {
  // Asegúrate de que el nombre del parámetro coincida con el de app.routes.ts (ej: :id)
  this.claseId = this.route.snapshot.paramMap.get('id');
  
  if (!this.claseId) {
    console.error("No se encontró el ID en la URL");
  } else {
    this.cargarClase();
  }
}

  cargarClase() {
    if (this.claseId) {
      this.http.get(`https://localhost:7127/api/Clase/${this.claseId}`)
        .subscribe(data => this.clase = data);
    }
  }

  getImagenInstructor(id: string): string {
    const instructor = this.instructores.find(i => i.id === id);
    return instructor ? instructor.imagen : 'https://etenonfitness.com/wp-content/uploads/2021/12/gimnasio-1024x768.jpeg';
  }

  

  reservar() {
  const usuarioId = this.authService.currentUserValue?.id;
  
  // Validamos que existan AMBOS IDs antes de seguir
  if (!this.claseId || this.claseId === 'null') {
    this.uiService.mostrarMensaje("Error: ID de clase no válido.");
    return;
  }
  if (!usuarioId) {
    this.uiService.mostrarMensaje("Debes iniciar sesión.");
    return;
  }

  this.http.post(`https://localhost:7127/api/Clase/${this.claseId}/reservar`, { 
    usuarioId: usuarioId 
  }).subscribe({
    next: () => {
      this.uiService.mostrarMensaje("¡Reserva realizada!");
      this.cargarClase();
    },
    error: (err) => {
      console.error("Error en reserva:", err);
    }
  });
}
}