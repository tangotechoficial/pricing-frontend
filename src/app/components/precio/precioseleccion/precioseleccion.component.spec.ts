import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioSeleccion } from './precioseleccion.component';

describe('PrecioSeleccion', () => {
  let component: PrecioSeleccion;
  let fixture: ComponentFixture<PrecioSeleccion>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioSeleccion ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioSeleccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
