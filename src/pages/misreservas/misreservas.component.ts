import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ClassService } from '../../services/class.services';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule], 
  templateUrl: './misreservas.component.html',
  styleUrl: './misreservas.component.css'
})
export class MisReservasComponent implements OnInit {
  reservas: any[] = [];

  constructor(
    private classService: ClassService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.currentUserValue;
    if (usuario) {
      this.classService.getMisReservas(usuario.id).subscribe({
        next: (data) => this.reservas = data,
        error: (err) => console.error(err)
      });
    }
  }

cancelar(claseId: string) {
  const user = this.authService.currentUserValue;
  if (!user) return;

  this.classService.cancelarReserva(claseId, user.id).subscribe({
    next: () => {
      // Quitamos la clase de la lista local para que desaparezca visualmente
      this.reservas = this.reservas.filter(c => c.id !== claseId);
      alert('Reserva cancelada correctamente');
    },
    error: (err) => {
      alert(err.message);
    }
  });
}
}