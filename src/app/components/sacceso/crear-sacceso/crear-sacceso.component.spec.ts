import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSaccesoComponent } from './crear-sacceso.component';

describe('CrearSaccesoComponent', () => {
  let component: CrearSaccesoComponent;
  let fixture: ComponentFixture<CrearSaccesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearSaccesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSaccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
