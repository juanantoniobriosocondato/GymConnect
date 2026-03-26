import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ClassService } from '../../services/class.services';
import { AuthService } from '../../services/auth.service';
import { UiService } from '../../services/ui.service';
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
    private authService: AuthService,
    private uiService: UiService
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
  if(confirm('¿Quieres cancelar esta reserva?')){
    this.classService.cancelarReserva(claseId, user.id).subscribe({
    next: () => {
      this.reservas = this.reservas.filter(c => c.id !== claseId);
      this.uiService.mostrarMensaje('Reserva cancelada correctamente');
    },
    error: (err) => {
      this.uiService.mostrarMensaje(err.message || 'Error al cancelar', 'error');
    }
  });
  }
  
}
}