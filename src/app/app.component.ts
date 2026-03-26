import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Asegúrate de que el nombre de la clase sea exactamente el que pusiste en su archivo
import { NavBarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from "./components/footer/footer.component"; 

@Component({
  selector: 'app-root',
  standalone: true,
  // Aquí también debe coincidir
  imports: [RouterOutlet, NavBarComponent, FooterComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GymConnect';
}