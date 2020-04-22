import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorVendasComponent } from './simulador-vendas.component';

describe('SimuladorVendasComponent', () => {
  let component: SimuladorVendasComponent;
  let fixture: ComponentFixture<SimuladorVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimuladorVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladorVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
