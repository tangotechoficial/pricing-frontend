<<<<<<< HEAD
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
=======
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA, Type} from '@angular/core';
import { HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {HttpResponse} from '@angular/common/http'
>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9
import { By } from '@angular/platform-browser';
import { DadosMestreComponent } from './dados-mestre.component';
import { of } from  'rxjs';
import { DadosMestreVerbaService} from '@services/dados-mestre-verba.service';
import {DadosMestresComposicaoPrecoService } from '@services/dados-mestres-composicao-preco.service';
<<<<<<< HEAD
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing';
import { NavegacionComponent } from '@app/components/navegacion/navegacion.component';
import { TechnicalMenuComponent } from '@app/components/navegacion/technical-menu/technical-menu.component';
import { BusinessMenuComponent } from '@app/components/navegacion/business-menu/business-menu.component';
=======
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { NavegacionComponent } from '@app/components/navegacion/navegacion.component';
import { TechnicalMenuComponent } from '@app/components/navegacion/technical-menu/technical-menu.component';
import { FilterModalComponent } from '@app/components/filter-modal/filter-modal.component';
import { BusinessMenuComponent } from '@app/components/navegacion/business-menu/business-menu.component';
import { AuthenticationService } from '@services/authentication.service'
import { environment } from '@env/environment';
import { mockPipe } from '@app/pipes/mock.pipe';
import verbas from '@datasources/dados-mestre-verba.json';
import prices from '@datasources/dados-mestre-preco.json';
>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9

fdescribe('DadosMestreComponent', () => {
  let component: DadosMestreComponent;
  let fixture: ComponentFixture<DadosMestreComponent>;
  let element: DebugElement;
  let moneyServiceStub: any;
  let priceCompositinonServiceStub: any;
<<<<<<< HEAD

  beforeEach(async(() => {
    moneyServiceStub = {
      dadosMestresVerba: () => of(
        [{
          'url':'http://localhost:8000/api/dadosmestre/100/',
          'NUMANOMES':201901,
          'CODPRD':1602127,
          'DESPRD':'CALDO KNORR CARNE 80X114G',
          'CODFILEPD':52,
          'CODDIVFRN':15850,
          'VLRPRECOSALDOMESANTERIOR':'6.04',
          'VLRPRECOCREDITO':'0.00',
          'VLRPRECODEBITO':'0.00',
          'VLRMARGEMSALDOMESANTERIOR':'-1309.60',
          'VLRMARGEMCREDITO':'0.00',
          'VLRMARGEMDEBITO':'0.00'
        }])
    }
    priceCompositinonServiceStub = {
      dadosMestresPreco: () => of(
        [{
          'CODPRD': '205057',
          'DESPRD': 'ABS.PLENITUD FEMME NOTURNO 8X1',
          'ABC': 'A',
          'SENSIVEL_REBATE': '0',
          'TIPEDEREG': '34',
          'CODEDEREG': '250',
          'CODFILEMP': '64',
          'CODFILFAT': '370',
          'MB': '24,08',
          'MB_CALCULADA': '26,79',
          'VERBA_PRECO': '0',
          'FUND_PRECO': '100',
          'REBATE': '0,3462',
          'ICMS': '0',
          'PIS_COFINS': '9,25',
          'DEVOLUCAO': '0,5',
          'TARGET': '14,87',
          'FLEX': '5',
          'CMV': '96,797',
          'BONIFICADO': '0',
          'COMPLEMENTO': '0',
          'PRECOBASE': '0',
          'DATA_PRECO': '1/2/2020 00:00',
          'CODESTUNI': 'SP',
          'PRECO_LIVRO': '14,34'
        }]
      )
    }
    TestBed.configureTestingModule({
      declarations: [ DadosMestreComponent, NavegacionComponent, TechnicalMenuComponent, BusinessMenuComponent],
      imports: [ HttpClientModule, RouterTestingModule, NoopAnimationsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
=======
  let requestMock: HttpTestingController;
  let auth: AuthenticationService

  beforeEach(async(() => {
    moneyServiceStub = {
      dadosMestresVerba: () => of(verbas)
    }
    priceCompositinonServiceStub = {
      dadosMestresPreco: () => of(prices)
    }
    TestBed.configureTestingModule({
      declarations: [
        DadosMestreComponent,
        NavegacionComponent,
        TechnicalMenuComponent,
        BusinessMenuComponent,
        FilterModalComponent,
        mockPipe({name: 'filter'})
      ],
      imports: [ HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule, ReactiveFormsModule],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        AuthenticationService,
>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9
        {provide: DadosMestresComposicaoPrecoService, useValue: priceCompositinonServiceStub },
        {provide: DadosMestreVerbaService, useValue: moneyServiceStub}
      ],
    })
    .compileComponents();
<<<<<<< HEAD
=======
    requestMock = TestBed.get(HttpTestingController)
    auth = TestBed.get(AuthenticationService)
    localStorage.setItem('token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTU4NTM1MDM5OCwiZW1haWwiOiIiLCJvcmlnX2lhdCI6MTU4NTE3NzU5OH0.JUMk08lro0rKUJhF58Ewmgfr0uout7uKkGiKllxcnaM")
    localStorage.setItem('User', "{}")
>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosMestreComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

<<<<<<< HEAD
=======


>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present tabs navigation', () => {
    const nav = element.query(By.css('[id="tabs"]'))
<<<<<<< HEAD
    console.log(nav);
=======
>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9
    expect(nav.children.length).toBe(2);
  })

  it('should contain 2 tables', () => {
    const tables = element.query(By.css('table'))
    expect(tables.childNodes.length).toBe(2)
  })
<<<<<<< HEAD
  /**
  it('table price composition should have data', () => {
    const table = element.query(By.css('[id="priceComposition"]'))
    //debuger
  })

  it('table verba info should have data', () => {
      component.ngOnInit()
=======

  it('should have a "filter" button on first row', () => {
    const button = element.query(By.css('button.btn-filter-color'))
    expect(button.nativeElement.innerText.trim()).toBe('Filtro')
    expect(button.listeners.length).toBe(1);
    expect(button.listeners[0].name).toBe('click');
  })

  it('should call the right function when clicked', async(() => {
    let button = fixture.debugElement.nativeElement.querySelector('button.btn-filter-color');
    spyOn(component, 'showFilterModal');
    button.click();
    fixture.whenStable().then(() => {
    expect(component.showFilterModal).toHaveBeenCalled();
    });
  }))

  it('price composition should have data', () => {
    const req = requestMock.expectOne(`${environment.apiUrl}/dadosmestrecomposicao`);
    req.flush(prices)
    console.log(component.masterDataPriceComposition)
    expect(component.masterDataPriceComposition.length).toBeGreaterThan(0)

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      const table = fixture.debugElement.nativeElement.querySelector('#priceComposition')
      expect(table.rows.length).toBeGreaterThan(1)
    });

  })

  it('price verba should have data', () => {
    const req = requestMock.expectOne(`${environment.apiUrl}/dadosmestreverba`);
    console.log(verbas)
    req.flush(verbas)
    debugger
    expect(component.masterDataMoney.length).toBeGreaterThan(0)

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      const table = fixture.debugElement.nativeElement.querySelector('#verbaInfo')
      expect(table.rows.length).toBeGreaterThan(1)
    });

  })
  /**
  it('table verba info should have data', () => {
>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9
      fixture.detectChanges()
      const table = element.query(By.css('[id="verbaInfo"]'))
      //debuger
    }
  );
  **/
})
