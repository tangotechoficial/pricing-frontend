import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioBaseComponent } from './preciobase.component';

describe('PrecioBaseComponent', () => {
  let component: PrecioBaseComponent;
  let fixture: ComponentFixture<PrecioBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
