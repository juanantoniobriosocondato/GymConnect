import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ClassService } from '../../services/class.services'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-clases',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule],
  templateUrl: './class-list.component.html', 
  styleUrl: './class-list.component.css'
})
export class ListadoClasesComponent implements OnInit {
  clases: any[] = [];
  disciplinaSeleccionada: string = ''; // Vinculada al select

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.cargarClases();
  }

  cargarClases(): void {
    this.classService.getClases(this.disciplinaSeleccionada).subscribe({
      next: (data) => {
        this.clases = data;
      },
      error: (err) => console.error("Error al filtrar:", err)
    });
  }
}