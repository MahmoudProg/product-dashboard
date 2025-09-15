import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { StyledInputDirective } from './directives/styled-input.directive';
import { RangeInputComponent } from './components/range-input/range-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // shared components, directives, pipes

    RatingStarsComponent,
    StyledInputDirective,
    RangeInputComponent,

  ],
  imports: [CommonModule,FormsModule],
  exports: [
    CommonModule,
    RatingStarsComponent,
    StyledInputDirective,
    RangeInputComponent
  ],
})
export class SharedModule {}
