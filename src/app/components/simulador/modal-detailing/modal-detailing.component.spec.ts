import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailingComponent } from './modal-detailing.component';

describe('ModalDetailingComponent', () => {
  let component: ModalDetailingComponent;
  let fixture: ComponentFixture<ModalDetailingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
