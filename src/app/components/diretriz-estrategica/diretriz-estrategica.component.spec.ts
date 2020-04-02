import { async, ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD

import { DiretrizEstrategicaComponent } from './diretriz-estrategica.component';

describe('DiretrizEstrategicaComponent', () => {
  let component: DiretrizEstrategicaComponent;
  let fixture: ComponentFixture<DiretrizEstrategicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretrizEstrategicaComponent ]
=======
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
>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretrizEstrategicaComponent);
    component = fixture.componentInstance;
<<<<<<< HEAD
=======
    element = fixture.debugElement;
>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
<<<<<<< HEAD
=======

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

  it('filter should contain 4 options', () => {
    const containers = element.query(By.css('.filter-columns'))
    expect(containers.childNodes.length).toBe(4)
  })

  it('table-head should have 6 fiels and 6 spaces', () => {
    const containers = element.query(By.css('.table-head'))
    expect(containers.childNodes.length).toBe(12)
  })

  


  

>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9
});
