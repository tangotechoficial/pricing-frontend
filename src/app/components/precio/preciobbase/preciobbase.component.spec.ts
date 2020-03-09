import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciobbaseComponent } from './preciobbase.component';

describe('PreciobbaseComponent', () => {
  let component: PreciobbaseComponent;
  let fixture: ComponentFixture<PreciobbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreciobbaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciobbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
