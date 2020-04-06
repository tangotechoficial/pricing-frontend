import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { FilterModalComponent } from './filter-modal.component';

fdescribe('FilterModalComponent', () => {
  let component: FilterModalComponent;
  let fixture: ComponentFixture<FilterModalComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterModalComponent ],
      imports: [ HttpClientModule, RouterTestingModule, ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterModalComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 3 divs', () => {
    const form = element.query(By.css('.form'))
    expect(form.childNodes.length).toBe(3)
  })
  
  it('should have a "reset" button', async(() => {
    const button = element.query(By.css('.btn-default'))
    expect(button.nativeElement.innerText.trim()).toBe('Limpar')
    expect(button.listeners.length).toBe(1);
    expect(button.listeners[0].name).toBe('click');
  }))

  it('should have a "submit" button', async(() => {
    const button = element.query(By.css('.btn-primary'))
    expect(button.nativeElement.innerText.trim()).toBe('Filtrar')
    expect(button.listeners.length).toBe(1);
    expect(button.listeners[0].name).toBe('click');
  }))

  it('should call the reset function when clicked', async(() => {
    let button = fixture.debugElement.nativeElement.querySelector('.btn-default');
    spyOn(component, 'reset');
    button.click();
    fixture.whenStable().then(() => {
    expect(component.reset).toHaveBeenCalled();
    });
  }))

  it('should call the submit function when clicked', async(() => {
    let button = fixture.debugElement.nativeElement.querySelector('.btn-primary');
    spyOn(component, 'submit');
    button.click();
    fixture.whenStable().then(() => {
    expect(component.submit).toHaveBeenCalled();
    });
  }))

});
