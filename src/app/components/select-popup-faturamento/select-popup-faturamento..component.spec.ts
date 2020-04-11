import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPopupFaturamentoComponent } from './select-popup-faturamento.component';

describe('SelectPopupFaturamentoComponent', () => {
  let component: SelectPopupFaturamentoComponent;
  let fixture: ComponentFixture<SelectPopupFaturamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPopupFaturamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPopupFaturamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getSelectedFaturamento', () => {
    component.getSelectedFaturamento("test value", 1)
    expect(component.currentFaturamento).toEqual("test value");

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

})
