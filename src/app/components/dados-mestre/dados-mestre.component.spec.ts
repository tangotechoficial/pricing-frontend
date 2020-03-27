import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA, Type} from '@angular/core';
import { HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {HttpResponse} from '@angular/common/http'
import { By } from '@angular/platform-browser';
import { DadosMestreComponent } from './dados-mestre.component';
import { of } from  'rxjs';
import { DadosMestreVerbaService} from '@services/dados-mestre-verba.service';
import {DadosMestresComposicaoPrecoService } from '@services/dados-mestres-composicao-preco.service';
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
import { mockPipe } from '@app/pipes/mock.pipe'
import verbas from '@datasources/dados-mestre-verba.json'
import prices from '@datasources/dados-mestre-verba.json'

fdescribe('DadosMestreComponent', () => {
  let component: DadosMestreComponent;
  let fixture: ComponentFixture<DadosMestreComponent>;
  let element: DebugElement;
  let moneyServiceStub: any;
  let priceCompositinonServiceStub: any;
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
        {provide: DadosMestresComposicaoPrecoService, useValue: priceCompositinonServiceStub },
        {provide: DadosMestreVerbaService, useValue: moneyServiceStub}
      ],
    })
    .compileComponents();
    requestMock = TestBed.get(HttpTestingController)
    auth = TestBed.get(AuthenticationService)
    localStorage.setItem('token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTU4NTM1MDM5OCwiZW1haWwiOiIiLCJvcmlnX2lhdCI6MTU4NTE3NzU5OH0.JUMk08lro0rKUJhF58Ewmgfr0uout7uKkGiKllxcnaM")
    localStorage.setItem('User', "{}")

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
    expect(nav.children.length).toBe(2);
  })

  it('should contain 2 tables', () => {
    const tables = element.query(By.css('table'))
    expect(tables.childNodes.length).toBe(2)
  })

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
    fixture.detectChanges()
    const req = requestMock.match(`${environment.apiUrl}/dadosmestrecomposicao`)[0];
    req.flush(prices)

    expect(component.masterDataPriceComposition.length).toBeGreaterThan(0)

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      const table = fixture.debugElement.nativeElement.querySelector('#priceComposition')
      expect(table.rows.length).toBeGreaterThan(1)
    });

  })
  /**
  it('table verba info should have data', () => {
      fixture.detectChanges()
      const table = element.query(By.css('[id="verbaInfo"]'))
      //debuger
    }
  );
  **/
})
