import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretrizEstrategicaComponent } from './diretriz-estrategica.component';

describe('DiretrizEstrategicaComponent', () => {
  let component: DiretrizEstrategicaComponent;
  let fixture: ComponentFixture<DiretrizEstrategicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretrizEstrategicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretrizEstrategicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
