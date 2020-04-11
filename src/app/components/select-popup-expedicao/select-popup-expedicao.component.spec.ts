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

  it('getSelectedExpedicao', () => {
    component.getSelectedExpedicao("Test Value", 1)
    expect(component.currentExpedicao).toEqual("Test Value");

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

  })
});
