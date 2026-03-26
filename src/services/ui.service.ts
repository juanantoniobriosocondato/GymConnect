import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root' // Esto hace que esté disponible en toda la app
})
export class UiService {

  constructor(private snackBar: MatSnackBar) {}

  mostrarMensaje(mensaje: string, tipo: 'error' | 'exito' = 'exito') {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: tipo === 'exito' ? ['snack-exito'] : ['snack-error']
    });
  }
}