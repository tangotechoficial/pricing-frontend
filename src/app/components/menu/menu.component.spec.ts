import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {NavegacionComponent} from '../navegacion/navegacion.component'
import {BusinessMenuComponent} from '../navegacion/business-menu/business-menu.component'
import {TechnicalMenuComponent} from '../navegacion/technical-menu/technical-menu.component'
import { RouterTestingModule } from '@angular/router/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {  HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent , NavegacionComponent , BusinessMenuComponent, TechnicalMenuComponent],
      imports:[RouterTestingModule , HttpClientTestingModule]
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

  // it("Close Welcome Message" , ()=>{
  //   component.closeWelcome();
  //   expect(component.modalView).toBeTruthy()
  // })



});
