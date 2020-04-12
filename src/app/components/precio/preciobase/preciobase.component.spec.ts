import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrecioBaseComponent } from './preciobase.component';
import { CondicionService } from 'app/services/condicion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EsquemasService } from 'app/services/esquemas.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



describe('PrecioBaseComponent', () => {
  let component: PrecioBaseComponent;
  let fixture: ComponentFixture<PrecioBaseComponent>;

  localStorage['User'] = `{
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
      declarations: [ PrecioBaseComponent ],
      providers: [ CondicionService, NgxSpinnerService, EsquemasService],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ HttpClientModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioBaseComponent);
    component = fixture.componentInstance;
    component.fetchData = () => {}
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  describe("ngOnInit", () => {
    it('Check technical user', () => {
      component.checkTypeUser()
      expect(component.bBusiness).toBeFalsy();
    })
  })



});
