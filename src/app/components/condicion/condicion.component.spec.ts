import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionComponent } from './condicion.component';

describe('CondicionComponent', () => {
  let component: CondicionComponent;
  let fixture: ComponentFixture<CondicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
