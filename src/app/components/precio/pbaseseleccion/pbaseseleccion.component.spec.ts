import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbaseseleccionComponent } from './pbaseseleccion.component';

describe('PbaseseleccionComponent', () => {
  let component: PbaseseleccionComponent;
  let fixture: ComponentFixture<PbaseseleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbaseseleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbaseseleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
