import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCondicionComponent } from './select-condicion.component';

describe('SelectCondicionComponent', () => {
  let component: SelectCondicionComponent;
  let fixture: ComponentFixture<SelectCondicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCondicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCondicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
