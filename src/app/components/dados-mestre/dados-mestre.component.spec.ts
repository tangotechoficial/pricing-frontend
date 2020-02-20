import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosMestreComponent } from './dados-mestre.component';

describe('DadosMestreComponent', () => {
  let component: DadosMestreComponent;
  let fixture: ComponentFixture<DadosMestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosMestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosMestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
