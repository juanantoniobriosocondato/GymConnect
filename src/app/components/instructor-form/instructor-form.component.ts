import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InstructorService } from '../../../services/instructor.service';
import { CommonModule } from '@angular/common';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-instructor-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './instructor-form.component.html'
})
export class InstructorFormComponent implements OnInit {
  instructorForm: FormGroup;
  isEditMode = false;
  instructorId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private instructorService: InstructorService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {
    this.instructorForm = this.fb.group({
      nomApe: ['', Validators.required],
      especialidad: [''],
      email: ['', [Validators.required, Validators.email]],
      imagen: ['https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=500']
    });
  }

  ngOnInit(): void {
    // Comprobar si recibimos un ID por parámetro
    this.instructorId = this.route.snapshot.paramMap.get('id');
    if (this.instructorId) {
      this.isEditMode = true;
      this.instructorService.getById(this.instructorId).subscribe({
        next: (instructor) => this.instructorForm.patchValue(instructor),
        error: (err) => console.error('Error al cargar instructor', err)
      });
    }
  }

  guardar() {
    if (this.instructorForm.invalid) return;

    const datos = this.instructorForm.value;

    if (this.isEditMode && this.instructorId) {
      // MODO EDITAR
      this.instructorService.update(this.instructorId, { ...datos, id: this.instructorId }).subscribe({
        next: () => {
          this.uiService.mostrarMensaje('Instructor actualizado correctamente');
          this.router.navigate(['/perfil/gestion-instructores']);
        }
      });
    } else {
      // MODO CREAR
      this.instructorService.create(datos).subscribe({
        next: () => {
          this.uiService.mostrarMensaje('Instructor creado correctamente');
          this.router.navigate(['/perfil/gestion-instructores']);
        }
      });
    }
  }
}