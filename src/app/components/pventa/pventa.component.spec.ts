import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PventaComponent } from './pventa.component';

describe('PventaComponent', () => {
  let component: PventaComponent;
  let fixture: ComponentFixture<PventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
