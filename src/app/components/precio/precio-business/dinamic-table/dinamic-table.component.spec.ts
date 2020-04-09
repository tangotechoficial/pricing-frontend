import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicTableComponent } from './dinamic-table.component';

describe('DinamicTableComponent', () => {
  let component: DinamicTableComponent;
  let fixture: ComponentFixture<DinamicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinamicTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
