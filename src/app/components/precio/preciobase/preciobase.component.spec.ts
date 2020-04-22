import {
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { PrecioBaseComponent } from "./preciobase.component";
import { CondicionService } from "app/services/condicion.service";
import { NgxSpinnerService } from "ngx-spinner";
import { EsquemasService } from "app/services/esquemas.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthenticationService } from "@app/services/authentication.service";
import { JWTInterceptorHelper } from '@app/helpers/jwt.interceptor';

describe("PrecioBaseComponent", () => {
  let component: PrecioBaseComponent;
  let fixture: ComponentFixture<PrecioBaseComponent>;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrecioBaseComponent],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JWTInterceptorHelper,
          multi: true
        },
        CondicionService,
        NgxSpinnerService,
        EsquemasService
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule]
    }).compileComponents();

    inject(
      [AuthenticationService],
      (authenticationService: AuthenticationService) => {
        const email = "tester";
        const password = "@t@ng0@t3ch";
        authenticationService.login(email, password).subscribe();
      }
    )();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Check technical user", () => {
    component.checkTypeUser();
    expect(component.bBusiness).toBeFalsy();
  });

  it("check fetching data", done => {
    component.fetchData();
    setTimeout(() => {
      console.log(component.camadasFullData);
      expect(component.camadasFullData.length).toBeGreaterThan(1);
      done();
    }, 3000);
  });

});
