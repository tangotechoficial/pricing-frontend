import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingCompositionChartsComponent } from './selling-composition-charts.component';

describe('SellingCompositionChartsComponent', () => {
  let component: SellingCompositionChartsComponent;
  let fixture: ComponentFixture<SellingCompositionChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingCompositionChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingCompositionChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
