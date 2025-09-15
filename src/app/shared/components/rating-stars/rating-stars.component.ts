import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RatingStarsComponent {
  @Input() rate: number = 0;
  @Input() count: number = 0;
  @Input() showText: boolean = true;

  get fullStars(): number {
    return Math.floor(this.rate);
  }

  get halfStar(): boolean {
    return this.rate % 1 >= 0.5;
  }

  get emptyStars(): number {
    return 5 - this.fullStars - (this.halfStar ? 1 : 0);
  }
}
