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

  it('getSelectedRegiao', () => {
    component.getSelectedRegiao("test value", 1)
    expect(component.currentRegiao).toEqual("test value");

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
