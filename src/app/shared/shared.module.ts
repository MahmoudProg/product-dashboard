import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { StyledInputDirective } from './directives/styled-input.directive';

@NgModule({
  declarations: [
    // shared components, directives, pipes

    RatingStarsComponent,
    StyledInputDirective
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    RatingStarsComponent
  ],
})
export class SharedModule {}
