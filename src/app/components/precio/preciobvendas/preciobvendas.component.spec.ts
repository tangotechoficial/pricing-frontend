import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciobvendasComponent } from './preciobvendas.component';

describe('PreciobvendasComponent', () => {
  let component: PreciobvendasComponent;
  let fixture: ComponentFixture<PreciobvendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreciobvendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciobvendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
