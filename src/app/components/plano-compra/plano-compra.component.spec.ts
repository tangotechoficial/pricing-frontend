import { PurchasePlanningService } from '@services/purchasePlanning.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from  'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing';
import { PlanoCompraComponent } from './plano-compra.component';
import { NavegacionComponent } from '@app/components/navegacion/navegacion.component';
import { TechnicalMenuComponent } from '@app/components/navegacion/technical-menu/technical-menu.component';
import { BusinessMenuComponent } from '@app/components/navegacion/business-menu/business-menu.component';
import { environment } from '@env/environment';
import { mockPipe } from '@app/pipes/mock.pipe';
import data from '@datasources/plano-de-compras.json';

fdescribe('PlanoCompraComponent', () => {
  let component: PlanoCompraComponent;
  let fixture: ComponentFixture<PlanoCompraComponent>;
  let element: DebugElement;
  let requestMock: HttpTestingController;
  let planningServiceStub: any;

  beforeEach(async(() => {
    planningServiceStub = {
      planoCompras: () => of(data)
    }
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [ PlanoCompraComponent, NavegacionComponent, TechnicalMenuComponent, BusinessMenuComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {provide: PurchasePlanningService, useValue: planningServiceStub}
      ]
    })
    .compileComponents();
    requestMock = TestBed.get(HttpTestingController)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoCompraComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 rows', () => {
    const container = element.query(By.css('.main-container'))
    expect(container.childNodes.length).toBe(5);
  })

  it('should have a "filter" button on first row', () => {
    const button = element.query(By.css('button.btn-filter-color'))
    expect(button.nativeElement.innerText.trim()).toBe('Filtro')
    expect(button.listeners.length).toBe(1);
    expect(button.listeners[0].name).toBe('click');
  })

  it('plano compras should have data', () => {
    const req = requestMock.expectOne(`${environment.apiUrl}/planocompras`);
    req.flush(data)
    expect(component.planningData.length).toBeGreaterThan(0)

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      const table = fixture.debugElement.nativeElement.querySelector('#verbaInfo')
      expect(table.rows.length).toBeGreaterThan(1)
    });

  })

});
