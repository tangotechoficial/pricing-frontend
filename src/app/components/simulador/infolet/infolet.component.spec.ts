import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoletComponent } from './infolet.component';

describe('InfoletComponent', () => {
  let component: InfoletComponent;
  let fixture: ComponentFixture<InfoletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
