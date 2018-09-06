import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ui-carousel]'
})
export class UiCarouselDirective {

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.backgroundColor = 'red';
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style.flexWrap = 'nowrap';
    this.el.nativeElement.style.overflowX = 'auto';
  }

}
