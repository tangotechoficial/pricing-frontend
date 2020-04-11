import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPopupCondicionComponent } from './select-popup-condicion.component';

describe('SelectPopupCondicionComponent', () => {
  let component: SelectPopupCondicionComponent;
  let fixture: ComponentFixture<SelectPopupCondicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPopupCondicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPopupCondicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
