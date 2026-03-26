import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  usuarios: any[] = [];
  filtroNombre: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(data => this.usuarios = data);
  }

  get usuariosFiltrados() {
    return this.usuarios.filter(u => 
      u.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()) ||
      u.email.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }
}