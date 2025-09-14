import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/core/models/Product ';
import * as ProductsActions from '../../state/products.actions';
import { selectSelectedProduct, selectLoading, selectError } from '../../state/products.selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {
  private destroy$ = new Subject<void>();

  product$: Observable<Product | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.product$ = this.store.select(selectSelectedProduct);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  // ngOnInit(): void {
  //   // Listen to param changes
  //   this.route.paramMap.subscribe(params => {
  //     const id = params.get('id');
  //     if (id) {
  //       this.store.dispatch(ProductsActions.loadProductById({ id: id }));
  //     }
  //   });
  // }

   ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = params.get('id');
        if (id) {
          // Clear previous product to avoid flash
          this.store.dispatch(ProductsActions.clearSelectedProduct());
          // Load new product
          this.store.dispatch(ProductsActions.loadProductById({ id: id }));
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addToFavorites(product: Product) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.push(product);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  addToCart(product: Product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
