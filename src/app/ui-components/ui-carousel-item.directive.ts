import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ui-carousel-item]'
})
export class UiCarouselItemDirective {

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.backgroundColor = 'blue';
    this.el.nativeElement.style.flexShrink = 0;
    this.el.nativeElement.style.width = '150px';
  }

}
