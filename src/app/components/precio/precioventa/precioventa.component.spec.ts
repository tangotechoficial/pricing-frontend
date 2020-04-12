import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioVentaComponent } from './precioventa.component';
import { NavegacionComponent } from '../../navegacion/navegacion.component';
import { NgxSpinnerService } from 'ngx-spinner';

describe('PrecioVentaComponent', () => {
  let component: PrecioVentaComponent;
  let fixture: ComponentFixture<PrecioVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioVentaComponent , NavegacionComponent],
      providers: [NgxSpinnerService]
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
