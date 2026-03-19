import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para el *ngFor
import { RouterLink, RouterModule } from '@angular/router'; // Para el routerLink de las tarjetas
import { MatIconModule } from '@angular/material/icon';
import { ClassService } from '../../services/class.services';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // 1. Declaramos la variable para almacenar las clases
  clases: any[] = [];

  // 2. Inyectamos el servicio en el constructor
  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    // 3. Llamamos al servicio al iniciar
    this.classService.getClases().subscribe({
      next: (data) => {
        // Tomamos solo las primeras 3 clases como pide el PDF
        this.clases = data.slice(0, 3);
      },
      error: (err) => {
        console.error('Error al cargar clases en el home', err);
      }
    });
  }
}