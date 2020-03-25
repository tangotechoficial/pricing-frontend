import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DadosMestreComponent } from './dados-mestre.component';
import { of } from  'rxjs';
import { DadosMestreVerbaService} from '@services/dados-mestre-verba.service';
import {DadosMestresComposicaoPrecoService } from '@services/dados-mestres-composicao-preco.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing';
import { NavegacionComponent } from '@app/components/navegacion/navegacion.component';
import { TechnicalMenuComponent } from '@app/components/navegacion/technical-menu/technical-menu.component';
import { BusinessMenuComponent } from '@app/components/navegacion/business-menu/business-menu.component';
import { mockPipe } from '@app/pipes/mock.pipe'

fdescribe('DadosMestreComponent', () => {
  let component: DadosMestreComponent;
  let fixture: ComponentFixture<DadosMestreComponent>;
  let element: DebugElement;
  let moneyServiceStub: any;
  let priceCompositinonServiceStub: any;

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
      declarations: [
        DadosMestreComponent,
        NavegacionComponent,
        TechnicalMenuComponent,
        BusinessMenuComponent,
        mockPipe({name: 'filter'})
      ],
      imports: [ HttpClientModule, RouterTestingModule, NoopAnimationsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {provide: DadosMestresComposicaoPrecoService, useValue: priceCompositinonServiceStub },
        {provide: DadosMestreVerbaService, useValue: moneyServiceStub}
      ],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosMestreComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present tabs navigation', () => {
    const nav = element.query(By.css('[id="tabs"]'))
    console.log(nav);
    expect(nav.children.length).toBe(2);
  })

  it('should contain 2 tables', () => {
    const tables = element.query(By.css('table'))
    expect(tables.childNodes.length).toBe(2)
  })
  /**
  it('table price composition should have data', () => {
    const table = element.query(By.css('[id="priceComposition"]'))
    //debuger
  })

  it('table verba info should have data', () => {
      component.ngOnInit()
      fixture.detectChanges()
      const table = element.query(By.css('[id="verbaInfo"]'))
      //debuger
    }
  );
  **/
})
