import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaccesoComponent } from './sacceso.component';

describe('SaccesoComponent', () => {
  let component: SaccesoComponent;
  let fixture: ComponentFixture<SaccesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaccesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
