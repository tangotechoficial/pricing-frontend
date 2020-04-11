import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupmenuComponent } from './popupmenu.component';


describe('PopupmenuComponent', () => {
  let component: PopupmenuComponent;
  let fixture: ComponentFixture<PopupmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe("ngOnInit", () => {
    
    it('selectedItem', () => {
      expect(component.selectedItem).toBeFalsy()
    })
  
  })

  describe('Functions', () => {

    it('getSelectedChaveContas', () => {
      component.getSelectedChaveContas({}, 1)
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

      expect(component.closePopup.emit).toHaveBeenCalledWith(true);

    })

  })



});
