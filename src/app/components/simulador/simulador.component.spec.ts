import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA, Type} from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NavegacionComponent } from '@app/components/navegacion/navegacion.component';
import { TechnicalMenuComponent } from '@app/components/navegacion/technical-menu/technical-menu.component';
import { FilterModalComponent } from '@app/components/filter-modal/filter-modal.component';
import { BusinessMenuComponent } from '@app/components/navegacion/business-menu/business-menu.component';

import { SimuladorComponent } from './simulador.component';

fdescribe('SimuladorComponent', () => {
  let component: SimuladorComponent;
  let fixture: ComponentFixture<SimuladorComponent>;
  let element: DebugElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SimuladorComponent,
        NavegacionComponent,
        TechnicalMenuComponent,
        FilterModalComponent,
        BusinessMenuComponent
      ],
      imports: [ HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladorComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('page should have a "filter" button on first row', () => {
    const button = element.query(By.css('button.btn-filter-color'))
    expect(button.nativeElement.innerText.trim()).toBe('Filtro')
    expect(button.listeners.length).toBe(1);
    expect(button.listeners[0].name).toBe('click');
  })

  it('container should have 2 (two) rows', () => {
    const container = element.query(By.css('.main-container'))
    expect(container.childNodes.length).toBe(2);
  })

  

});
