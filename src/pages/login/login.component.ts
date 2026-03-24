import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Ruta al servicio
import { Router } from '@angular/router';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Datos vinculados al formulario de Login (arriba en tu wireframe)
  loginData = { email: '', password: '' };

  // Datos vinculados al formulario de Registro (abajo en tu wireframe)
  registerData = { nombre: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        alert('Bienvenido ' + res.nombre);
        this.router.navigate(['/clases']); // Te manda a las clases al entrar
      },
      error: (err) => alert('Error: Correo o contraseña incorrectos')
    });
  }

  onRegister() {
    this.authService.registrar(this.registerData).subscribe({
      next: () => {
        alert('¡Usuario registrado! Ya puedes subir e iniciar sesión.');
        this.registerData = { nombre: '', email: '', password: '' }; // Limpia el formulario
      },
      error: (err) => alert('Error al registrar usuario')
    });
  }
}