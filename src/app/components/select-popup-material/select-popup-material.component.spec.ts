import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPopupMaterialComponent } from './select-popup-material.component';

describe('SelectPopupMaterialComponent', () => {
  let component: SelectPopupMaterialComponent;
  let fixture: ComponentFixture<SelectPopupMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPopupMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPopupMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
