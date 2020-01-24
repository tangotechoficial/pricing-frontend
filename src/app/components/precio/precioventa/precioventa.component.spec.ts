import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioVentaComponent } from './precioventa.component';

describe('PrecioVentaComponent', () => {
  let component: PrecioVentaComponent;
  let fixture: ComponentFixture<PrecioVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
