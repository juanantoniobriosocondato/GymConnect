import { Routes } from '@angular/router';
import { HomeComponent } from '../../src/pages/home/home.component'; // Ajusta la ruta según tu estructura
import { ListadoClasesComponent } from '../pages/class-list/class-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clases', component: ListadoClasesComponent },
  { path: '**', redirectTo: '' } // Redirige cualquier error al home
];