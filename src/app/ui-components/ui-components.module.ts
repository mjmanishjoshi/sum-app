import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCarouselDirective } from './ui-carousel.directive';
import { UiCarouselItemDirective } from './ui-carousel-item.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    UiCarouselDirective,
    UiCarouselItemDirective
  ],
  declarations: [
    UiCarouselDirective,
    UiCarouselItemDirective
  ]
})
export class UiComponentsModule { }
