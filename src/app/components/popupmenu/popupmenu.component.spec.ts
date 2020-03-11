import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupmenuComponent } from './popupmenu.component';

describe('PopupmenuComponent', () => {
  let component: PopupmenuComponent;
  let fixture: ComponentFixture<PopupmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
