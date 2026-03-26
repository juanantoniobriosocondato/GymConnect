import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  usuario: any = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Obtenemos los datos del usuario desde tu AuthService
    this.usuario = this.authService.currentUserValue;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.usuario?.rol === 'Administrador'; // Ajusta según cómo guardes el rol
  }
}