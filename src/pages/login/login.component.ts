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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Datos vinculados al formulario de Login (arriba en tu wireframe)
  loginData = { email: '', password: '' };

  // Datos vinculados al formulario de Registro (abajo en tu wireframe)
  registerData = { nombre: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  mostrarMensaje(mensaje: string, tipo: 'error' | 'exito' = 'exito') {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: tipo === 'exito' ? ['snack-exito'] : ['snack-error']
    });
  }

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        this.mostrarMensaje('¡Bienvenido de nuevo, ' + res.nombre + '!');
        this.router.navigate(['/clases']);
      },
      error: () => this.mostrarMensaje('Correo o contraseña incorrectos', 'error')
    });
  }

  onRegister() {
    this.authService.registrar(this.registerData).subscribe({
      next: () => {
        this.mostrarMensaje('¡Registro completado! Ya puedes entrar.');
        this.registerData = { nombre: '', email: '', password: '' };
      },
      error: () => this.mostrarMensaje('Error al registrar usuario', 'error')
    });
  }
}