import { HostListener, Directive, Host, Self, Optional } from '@angular/core';
import { InlineEditComponent } from './inline-edit/inline-edit.component'

@Directive({
  selector: '[editableOnEnter]'
})
export class EditableOnEnterDirective {

  constructor( @Host() @Self() @Optional() private editable: InlineEditComponent) { }
  @HostListener('keyup.enter')
  onPressEnter() {
    this.editable.toViewMode();
  }
}
