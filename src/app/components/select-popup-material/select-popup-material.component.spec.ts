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

  it('getSelectedMaterial', () => {
    component.getSelectedMaterial("test value", 1)
    expect(component.currentMaterial).toEqual("test value");

  })


  it('event closePopup', () => {
    // spy on event emitter
    const component = fixture.componentInstance;
    spyOn(component.closePopup, 'emit');

    // trigger the click
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.closePopup.emit).toHaveBeenCalledWith(false);

});

});
