import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // FALTA ESTO
import { ActivatedRoute, Router } from '@angular/router'; // FALTA ESTO

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Servicios
import { ClassService } from '../../../services/class.services'; // Revisa que la ruta sea correcta
import { InstructorService } from '../../../services/instructor.service';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-class-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './class-form.component.html'
})
export class ClassFormComponent implements OnInit {
  classForm!: FormGroup; // Añade el '!' para evitar error de inicialización
  editMode = false;
  claseId: string | null = null;
  instructores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private instructorService: InstructorService,
    private route: ActivatedRoute,
    private router: Router,
    private uiService: UiService
  ) {
    this.classForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      disciplina: ['', Validators.required],
      instructorId: ['', Validators.required],
      fecha: ['', Validators.required],
      capacidad: [20, [Validators.required, Validators.min(1)]],
      alumnosIds: [[]]
    });
  }

  ngOnInit(): void {
    this.instructorService.getInstructores().subscribe(data => this.instructores = data);

    this.claseId = this.route.snapshot.paramMap.get('id');
    if (this.claseId) {
      this.editMode = true;
      this.cargarDatosClase(this.claseId);
    }
  }

  cargarDatosClase(id: string) {
    this.classService.getByIdAsync(id).subscribe(clase => {
      const fechaFormateada = new Date(clase.fecha).toISOString().slice(0, 16);
      this.classForm.patchValue({
        ...clase,
        fecha: fechaFormateada
      });
    });
  }

  guardar() {
  if (this.classForm.invalid) return;

  const formValue = this.classForm.value;

  // Construimos el objeto base
  const datosClase = {
    nombre: formValue.nombre,
    disciplina: formValue.disciplina,
    fecha: new Date(formValue.fecha).toISOString(),
    capacidad: formValue.capacidad,
    duracion: "60 min",
    instructorId: formValue.instructorId,
  };

  if (this.editMode && this.claseId) {
    // ACTUALIZAR: Es vital pasar el ID dentro del objeto para que Mongo sepa cuál sobreescribir
    const datosParaActualizar = { ...datosClase, id: this.claseId };
    
    console.log('Actualizando clase existente:', datosParaActualizar);
    
    this.classService.updateAsync(datosParaActualizar).subscribe({
      next: () => {
        this.uiService.mostrarMensaje('Clase actualizada con éxito');
        this.router.navigate(['/clases']);
      },
      error: (err) => console.error('Error al actualizar:', err)
    });
  } else {
    // CREAR: Aquí no mandamos ID, Mongo genera uno nuevo
    console.log('Creando nueva clase:', datosClase);
    
    this.classService.createAsync(datosClase).subscribe({
      next: () => {
        this.uiService.mostrarMensaje('Clase creada con éxito');
        this.router.navigate(['/clases']);
      },
      error: (err) => console.error('Error al crear:', err)
    });
  }
}

  cancelar() {
    this.router.navigate(['/clases']);
  }
}