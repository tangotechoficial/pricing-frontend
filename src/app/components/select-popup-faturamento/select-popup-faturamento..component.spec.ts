import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPopupFilialComponent } from './select-popup-filial.component';

describe('SelectPopupFilialComponent', () => {
  let component: SelectPopupFilialComponent;
  let fixture: ComponentFixture<SelectPopupFilialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPopupFilialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPopupFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
