import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PrecioBaseComponent } from './preciobase.component';
import { CondicionService } from 'app/services/condicion.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { EsquemasService } from 'app/services/esquemas.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'app/models/user';

describe('PrecioBaseComponent', () => {
  let component: PrecioBaseComponent;
  let fixture: ComponentFixture<PrecioBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioBaseComponent ],
      providers: [ CondicionService, NgxSpinnerService, EsquemasService],
      imports: [ HttpClientModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // localStorage.setItem("User", JSON.stringify(new User("suzi.campahna@tangotech.com.br", "12345678", "Suzi Campahna", "Token", "technical", true, "103", 1)));
    fixture = TestBed.createComponent(PrecioBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  // describe("ngOnInit", () => {
  //   it('Check technical user', () => {
  //     component.checkTypeUser()
  //     expect(component.bBusiness).toBeFalsy()
  //   })
  // })


    /*
    it('Fetch data [loading]', () => {
      component.fetchData()
      expect(component.loading).toBeTruthy()
    })

    it('Fetch data OK [BASE]', (done) => {
      component.esquemasService
      .fetchCondicaoCamadaEsquema("B")
      .then(data => {
        const props = ['camada','condicaos','condicaosAllow','tipoValor']
        const keys = Object.keys(data[0])
        props.forEach(prop => {
          const exist = keys.some(key => key == prop)
          expect(exist).toBeTruthy()
        })
        done()
      })

    })

    it('Fetch data OK [VENDAS]', (done) => {
      component.esquemasService
      .fetchCondicaoCamadaEsquema("v")
      .then(data => {
        const props = ['camada','condicaos','condicaosAllow','tipoValor']
        const keys = Object.keys(data[0])
        props.forEach(prop => {
          const exist = keys.some(key => key == prop)
          expect(exist).toBeTruthy()
        })
        done()
      })

    })
    */


});
