import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf y [src]
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { InstructorService } from '../../../services/instructor.service';

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class InstructorFormComponent implements OnInit {
  instForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private instructorService: InstructorService, // Servicio inyectado correctamente
    private router: Router
  ) {
    this.instForm = this.fb.group({
      nomApe: ['', [Validators.required, Validators.minLength(3)]],
      especialidad: ['', Validators.required],
      bio: [''],
      fotoUrl: [''] 
    });
  }

  ngOnInit(): void {}

  guardarInstructor() {
    if (this.instForm.valid) {
      this.instructorService.create(this.instForm.value).subscribe({
        next: () => {
          alert('¡Instructor guardado con éxito!');
          this.router.navigate(['/clases']);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('No se pudo guardar el instructor. Revisa la consola.');
        }
      });
    } else {
      alert('Por favor, rellena todos los campos obligatorios.');
    }
  }
}