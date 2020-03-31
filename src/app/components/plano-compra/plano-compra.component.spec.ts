import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoCompraComponent } from './plano-compra.component';

describe('PlanoCompraComponent', () => {
  let component: PlanoCompraComponent;
  let fixture: ComponentFixture<PlanoCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
