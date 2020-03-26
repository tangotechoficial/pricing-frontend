import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';




import { NavegacionComponent } from '@app/components/navegacion/navegacion.component';
import { TechnicalMenuComponent } from '@app/components/navegacion/technical-menu/technical-menu.component';
import { DiretrizEstrategicaComponent } from './diretriz-estrategica.component';
import { BusinessMenuComponent } from '@app/components/navegacion/business-menu/business-menu.component';



fdescribe('DiretrizEstrategicaComponent', () => {
  let component: DiretrizEstrategicaComponent;
  let fixture: ComponentFixture<DiretrizEstrategicaComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DiretrizEstrategicaComponent,
        NavegacionComponent,
        TechnicalMenuComponent, 
        BusinessMenuComponent
      ],
      imports: [ HttpClientModule, RouterTestingModule, NoopAnimationsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretrizEstrategicaComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 2 table', () => {
    const tables = element.query(By.css('table'))
    expect(tables.childNodes.length).toBe(2)
  })

  it('should contain 1 row', () => {
    const containers = element.query(By.css('.background'))
    expect(containers.childNodes.length).toBe(1)
  })

  it('should contain 3 divs', () => {
    const containers = element.query(By.css('.row'))
    expect(containers.childNodes.length).toBe(3)
  })

  

});
