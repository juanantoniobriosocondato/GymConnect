import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../services/instructor.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-instructor-management',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './instructor-list.component.html'
})
export class InstructorManagementComponent implements OnInit {
  instructores: any[] = [];

  constructor(private instructorService: InstructorService, private uiService: UiService) {}

  ngOnInit(): void {
    this.cargarInstructores();
  }

  cargarInstructores() {
    this.instructorService.getAll().subscribe(data => this.instructores = data);
  }

  eliminar(id: string) {
  if (confirm('¿Estás seguro de que quieres eliminar a este instructor?')) {
    this.instructorService.delete(id).subscribe({
      next: () => {
        this.instructores = this.instructores.filter(i => i.id !== id);
        this.uiService.mostrarMensaje('Instructor eliminado con éxito.');
      },
      error: (err) => {
        if (err.status === 400 || err.status === 409) {
          this.uiService.mostrarMensaje('ERROR: No se puede eliminar al instructor porque tiene clases asignadas en el sistema.');
        } else {
          this.uiService.mostrarMensaje('Ocurrió un error inesperado al intentar eliminar.');
        }
      }
    });
  }
}
}