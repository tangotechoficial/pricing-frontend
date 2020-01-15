import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbaseComponent } from './pbase.component';

describe('PbaseComponent', () => {
  let component: PbaseComponent;
  let fixture: ComponentFixture<PbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
