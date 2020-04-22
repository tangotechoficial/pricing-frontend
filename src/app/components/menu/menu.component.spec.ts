import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { MenuComponent } from "./menu.component";
import { NavegacionComponent } from "../navegacion/navegacion.component";
import { BusinessMenuComponent } from "../navegacion/business-menu/business-menu.component";
import { TechnicalMenuComponent } from "../navegacion/technical-menu/technical-menu.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import {
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { AuthenticationService } from "@app/services/authentication.service";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe("MenuComponent", () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  localStorage["User"] = `{
    "id":4,
    "is_superuser":false,
    "username":"alice",
    "first_name":"Alice",
    "last_name":"",
    "email":"",
    "groups": [
      {"name":"tecnico"}
    ]
  }`

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        NavegacionComponent,
        BusinessMenuComponent,
        TechnicalMenuComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
      ]
    }).compileComponents();

    // Esto es para hacer uso de auth service
    inject(
      [AuthenticationService],
      (authenticationService: AuthenticationService) => {
        const email = "tester";
        const password = "@t@ng0@t3ch";
        authenticationService.login(email, password).subscribe();
      }
    )();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Close Welcome Message" , ()=>{
    component.closeWelcome();
    expect(component.modalView).toBeTruthy()
  })
});
