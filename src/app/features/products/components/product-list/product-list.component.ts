import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/Product ';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  @Input() products: Product[] | null = [];
  @Input() loading: boolean | null = false;
  @Input() error: string | null = null;

  @Input() isInCart!: (productId: number) => Observable<boolean>;

  @Output() addToCart = new EventEmitter<Product>();
  @Output() removeFromCart = new EventEmitter<number>();

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }
}
