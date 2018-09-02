import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dashboard-tile-host]'
})
export class TileDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
