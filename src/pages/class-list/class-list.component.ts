import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ClassService } from '../../services/class.services'; 
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { InstructorService } from '../../services/instructor.service';
import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-listado-clases',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule],
  templateUrl: './class-list.component.html', 
  styleUrl: './class-list.component.css'
})
export class ListadoClasesComponent implements OnInit {
  clases: any[] = [];
  instructores: any[] = [];
  usuariosGlobales: any[] = []; 
  asistentesDetalle: any[] = []; 
  claseSeleccionadaNombre: string = '';
  // Variables para los filtros
  disciplinaSeleccionada: string = ''; 
  diaSeleccionado: string = '';
  instructorSeleccionado: string = ''; 

  diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  constructor(
  public authService: AuthService,
  private classService: ClassService,
  private router: Router,
  private instructorService: InstructorService,
  private userService: UserService,
  private uiService: UiService
) {}

cargarInstructores() {
  this.instructorService.getInstructores().subscribe(data => {
    this.instructores = data;
  });
}

  ngOnInit(): void {
    this.cargarClases();
    this.cargarListaInstructores();
    this.userService.getAll().subscribe(data => this.usuariosGlobales = data);
  }

  cargarClases(): void {
  this.classService.getClases(
    this.disciplinaSeleccionada, 
    this.instructorSeleccionado, 
    this.diaSeleccionado
  ).subscribe({
    next: (data) => {
      this.clases = data;
    },
    error: (err) => console.error("Error al cargar clases:", err)
  });
}

  filtrarPorDia(dia: string): void {
    // Si haces clic en el que ya está seleccionado, lo limpiamos 
    this.diaSeleccionado = (this.diaSeleccionado === dia) ? '' : dia;
    this.cargarClases();
  }

  limpiarFiltros(): void {
    this.disciplinaSeleccionada = '';
    this.diaSeleccionado = '';
    this.instructorSeleccionado = '';
    this.cargarClases();
  }

  cargarListaInstructores(): void {
  this.instructorService.getInstructores().subscribe({
    next: (data) => this.instructores = data,
    error: (err) => console.error("Error cargando instructores", err)
  });
}

  /*
  reservar(claseId: string): void {
    const usuario = this.authService.currentUserValue;
    if (!usuario) {
      alert("Debes iniciar sesión");
      return;
    }

    this.classService.reservarClase(claseId, usuario.id).subscribe({
      next: () => {
        alert("Reserva realizada");
        this.cargarClases(); // Refrescamos para ver el cambio
      },
      error: (err) => alert("Error: " + (err.error || "No se pudo reservar"))
    });
  }
    */

abrirModalCrear() {
  console.log('Abriendo formulario de creación...');
  this.router.navigate(['/admin/clase/nueva']);
}

editarClase(clase: any) {
  console.log('Editando clase:', clase);
  this.router.navigate(['/admin/clase/editar', clase.id]);
}

eliminarClase(id: string) {
  if (confirm('¿ESTÁS SEGURO? Esta acción es irreversible y borrará todas las reservas de los alumnos.')) {
    this.classService.deleteClase(id).subscribe({
      next: () => {
        // Filtramos la lista local para que desaparezca de la tabla al instante
        this.clases = this.clases.filter(c => c.id !== id);
        console.log('Clase eliminada con éxito');
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        this.uiService.mostrarMensaje('No se pudo eliminar la clase. Verifica si tiene dependencias.');
      }
    });
  }
}

getNombreInstructor(id: string): string {
  const instructor = this.instructores.find(i => i.id === id);
  return instructor ? instructor.nomApe : 'Sin asignar';
}

verAsistentes(clase: any) {
    this.claseSeleccionadaNombre = clase.nombre;
    
    if (!clase.alumnosIds || clase.alumnosIds.length === 0) {
      this.uiService.mostrarMensaje('Esta clase aún no tiene reservas.');
      this.asistentesDetalle = [];
      return;
    }

    // Cruzamos los IDs de la clase con los objetos de usuariosGlobales
    this.asistentesDetalle = clase.alumnosIds.map((id: string) => {
      return this.usuariosGlobales.find(u => u.id === id) || 
             { nombre: 'Usuario no encontrado', email: id };
    });
  }

  isAdmin(): boolean{
    return this.authService.currentUserValue?.rol === 'Administrador'
  }
}