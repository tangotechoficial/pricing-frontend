import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecucaoComponent } from './execucao.component';

describe('PexecucaoComponent', () => {
  let component: ExecucaoComponent;
  let fixture: ComponentFixture<ExecucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PexecucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PexecucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
