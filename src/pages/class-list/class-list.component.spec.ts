import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoClasesComponent } from './class-list.component'; // <--- CAMBIADO
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Necesario porque tu componente usa el servicio
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

describe('ListadoClasesComponent', () => { // <--- CAMBIADO
  let component: ListadoClasesComponent;
  let fixture: ComponentFixture<ListadoClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListadoClasesComponent, // <--- CAMBIADO
        HttpClientTestingModule, // Añadimos esto para que no falle al no tener el backend en el test
        MatIconModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});