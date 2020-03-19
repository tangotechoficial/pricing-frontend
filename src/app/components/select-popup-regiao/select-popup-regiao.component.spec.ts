import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPopupRegiaoComponent } from './select-popup-regiao.component';

describe('SelectPopupRegiaoComponent', () => {
  let component: SelectPopupRegiaoComponent;
  let fixture: ComponentFixture<SelectPopupRegiaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPopupRegiaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPopupRegiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
