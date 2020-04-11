import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Condicao } from 'app/models/condicao';
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
    expect(component).toBeTruthy();
  });

  it('getSelectedCondicao', () => {
    let testCond = new Condicao();
    component.getSelectedCondicao(testCond, 1)
    expect(component.currenObject).toEqual(testCond);
    expect(component.selectedItem).toBeTruthy();
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
