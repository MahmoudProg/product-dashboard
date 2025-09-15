import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Product } from 'src/app/core/models/Product ';
import * as ProductsActions from '../../state/products.actions';
import { selectSelectedProduct, selectLoading, selectError } from '../../state/products.selectors';

import * as CartActions from './../../../cart/state/cart.actions';
import * as FavoritesActions from './../../../favorites/state/favorites.actions';

import { selectCart } from './../../../cart/state/cart.selectors';
import { selectFavorites } from './../../../favorites/state/favorites.selectors';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  product$: Observable<Product | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  favorites$: Observable<Product[]>;
  cart$: Observable<any[]>;

  isFavorite$: Observable<boolean>;
  isInCart$: Observable<boolean>;


  constructor(private route: ActivatedRoute, private store: Store) {
    this.product$ = this.store.select(selectSelectedProduct);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);

    this.favorites$ = this.store.select(selectFavorites);
    this.cart$ = this.store.select(selectCart);


    //  in this code i check if this product lockated in localStorage favorites
    this.isFavorite$ = combineLatest([this.product$, this.favorites$]).pipe(
      map(([product, favorites]) =>{
        if (!product) return false;
        return favorites.some(f => f.id == product.id);
      })
    );

    //  in this code i check if this product lockated in localStorage cart
    this.isInCart$ = combineLatest([this.product$, this.cart$]).pipe(
      map(([product, cart]) => {
        if (!product) return false;
        return cart.some(c => c.id == product.id);
      })
    );

  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.store.dispatch(ProductsActions.clearSelectedProduct());
          this.store.dispatch(ProductsActions.loadProductById({ id }));
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addToFavorites(product: Product) {
    this.store.dispatch(FavoritesActions.addToFavorites({ product }));
  }

  removeFromFavorites(productId: number) {
    this.store.dispatch(FavoritesActions.removeFromFavorites({ productId }));
  }

  addToCart(product: Product) {
    this.store.dispatch(CartActions.addToCart({ product }));
  }

  removeFromCart(productId: number) {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }
}
