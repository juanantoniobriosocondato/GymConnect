import { Routes } from '@angular/router';
import { HomeComponent } from '../../src/pages/home/home.component'; // Ajusta la ruta según tu estructura
import { ListadoClasesComponent } from '../pages/class-list/class-list.component';
import { LoginComponent } from '../pages/login/login.component';
import { ClassDetailComponent } from '../pages/class-detail/class-detail.component';
import { MisReservasComponent } from '../pages/misreservas/misreservas.component';
import { ClassFormComponent } from './components/class-form/class-form.component';
import { InstructorFormComponent } from './components/instructor-form/instructor-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clases', component: ListadoClasesComponent },
  { path: 'login', component: LoginComponent},
  { path: 'clase/:id', component: ClassDetailComponent },
  { path: 'mis-reservas', component: MisReservasComponent },
  { path: 'admin/clase/nueva', component: ClassFormComponent },
  { path: 'admin/clase/editar/:id', component: ClassFormComponent },
  { path: 'admin/instructores/nuevo', component: InstructorFormComponent },
  { path: '**', redirectTo: '' } 
];