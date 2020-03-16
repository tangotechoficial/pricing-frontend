import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing';
import { PlanoCompraComponent } from './plano-compra.component';
import { NavegacionComponent } from '@app/components/navegacion/navegacion.component';
import { TechnicalMenuComponent } from '@app/components/navegacion/technical-menu/technical-menu.component';
import { BusinessMenuComponent } from '@app/components/navegacion/business-menu/business-menu.component';
fdescribe('PlanoCompraComponent', () => {
  let component: PlanoCompraComponent;
  let fixture: ComponentFixture<PlanoCompraComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NoopAnimationsModule ],
      declarations: [ PlanoCompraComponent, NavegacionComponent, TechnicalMenuComponent, BusinessMenuComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
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
    expect(container.childNodes.length).toBe(4);
  })

  it('should have a "filter" button on first row', () => {
    const button = element.query(By.css('button.btn-filter-color'))
    expect(button.nativeElement.innerText.trim()).toBe('Filtro')
    expect(button.listeners.length).toBe(1);
    expect(button.listeners[0].name).toBe('click');
  })
});
