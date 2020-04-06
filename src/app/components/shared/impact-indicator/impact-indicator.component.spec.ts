import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactIndicatorComponent } from './impact-indicator.component';

describe('ImpactIndicatorComponent', () => {
  let component: ImpactIndicatorComponent;
  let fixture: ComponentFixture<ImpactIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
