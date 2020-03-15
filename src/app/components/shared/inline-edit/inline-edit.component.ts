import { Component, OnDestroy, Output, ElementRef, ContentChild, EventEmitter } from '@angular/core';
import {ViewModeDirective} from '../viewmode.directive'
import {EditModeDirective} from '../editmode.directive'
import {fromEvent, Subject} from 'rxjs'
import {filter, switchMapTo, take, finalize} from 'rxjs/operators'
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'inline-edit',
  template: `
    <ng-container *ngTemplateOutlet="currentView"></ng-container>
  `,
})
export class InlineEditComponent implements OnDestroy {

  @Output() update = new EventEmitter();
  @ContentChild(ViewModeDirective, {static: true}) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective, {static: true}) editModeTpl: EditModeDirective;

  mode: 'view' | 'edit' = 'view';
  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  constructor(private host: ElementRef) { }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.template : this.editModeTpl.template
  }

  ngOnInit() {
    this.viewModeHandler()
    this.editModeHandler()
  }

  private get element() {
    return this.host.nativeElement
  }

  private viewModeHandler() {
    fromEvent(this.element, 'click').pipe(
      untilDestroyed(this),
      finalize(() =>
          console.log('completed')
      )
    ).subscribe(
      () => {
        this.mode = 'edit';
        this.editMode.next(true);
      }
    );
  }

  private editModeHandler() {

    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({target}) => this.element.contains(target) === false),
      take(1)
    )

    this.editMode$.pipe(
      switchMapTo(clickOutside$),
      untilDestroyed(this)
    ).subscribe(
      () => {
        this.update.next();
        this.mode = 'view';
      },
      finalize(() => console.log('Finalized'))
    )
  }
  
  toViewMode() {
    this.update.next();
    this.mode = 'view';
  }

  ngOnDestroy() {
  }
}
