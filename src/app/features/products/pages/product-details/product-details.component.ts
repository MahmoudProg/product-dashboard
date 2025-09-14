import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/core/models/Product ';
import * as ProductsActions from '../../state/products.actions';
import { selectSelectedProduct, selectLoading, selectError } from '../../state/products.selectors';

// استيراد الأكشنات
import * as FavoritesCartActions from '../../state/favorites-cart.actions';
import { selectFavorites, selectCart } from '../../state/favorites-cart.selectors';

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

    // // Combine product with favorites
    // this.isFavorite$ = this.store.select(selectSelectedProduct).pipe(
    //   map(product => {
    //     if (!product) return false;
    //     let favorites: Product[] = [];
    //     this.favorites$.subscribe(favs => (favorites = favs)).unsubscribe();
    //     return favorites.some(f => f.id === product.id);
    //   })
    // );

    // // Combine product with cart
    // this.isInCart$ = this.store.select(selectSelectedProduct).pipe(
    //   map(product => {
    //     if (!product) return false;
    //     let cart: any[] = [];
    //     this.cart$.subscribe(c => (cart = c)).unsubscribe();
    //     return cart.some(item => item.id === product.id);
    //   })
    // );

    // ✅ ندمج المنتج مع الـ favorites
    this.isFavorite$ = combineLatest([this.product$, this.favorites$]).pipe(
      map(([product, favorites]) =>
        !!product && favorites.some(f => f.id === product.id)
      )
    );

    // ✅ ندمج المنتج مع الـ cart
    this.isInCart$ = combineLatest([this.product$, this.cart$]).pipe(
      map(([product, cart]) =>
        !!product && cart.some(c => c.id === product.id)
      )
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
    // this.store.dispatch(FavoritesCartActions.addToFavorites({ product }));
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    console.log(favorites);
  }

  removeFromFavorites(productId: number) {
    this.store.dispatch(FavoritesCartActions.removeFromFavorites({ productId }));
  }

  addToCart(product: Product) {
    // this.store.dispatch(FavoritesCartActions.addToCart({ product }));
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(cart);
  }

  removeFromCart(productId: number) {
    this.store.dispatch(FavoritesCartActions.removeFromCart({ productId }));
  }
}
