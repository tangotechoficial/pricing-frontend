import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPopupExpedicaoComponent } from './select-popup-expedicao.component';

describe('SelectPopupExpedicaoComponent', () => {
  let component: SelectPopupExpedicaoComponent;
  let fixture: ComponentFixture<SelectPopupExpedicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPopupExpedicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPopupExpedicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
