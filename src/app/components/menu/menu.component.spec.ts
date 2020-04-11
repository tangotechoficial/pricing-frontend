import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {NavegacionComponent} from '../navegacion/navegacion.component'
import {BusinessMenuComponent} from '../navegacion/business-menu/business-menu.component'
import {TechnicalMenuComponent} from '../navegacion/technical-menu/technical-menu.component'
// import { Router, ActivatedRoute } from '@angular/router';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent , NavegacionComponent , BusinessMenuComponent, TechnicalMenuComponent],
      // providers:[ Router, ActivatedRoute]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Close Welcome Message" , ()=>{
    component.closeWelcome();
    expect(component.modalView).toBeTruthy()
  })



});
