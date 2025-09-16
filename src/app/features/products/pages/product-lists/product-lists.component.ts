import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, merge, Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/core/models/Product ';
import { selectCategories, selectError, selectFilteredProducts, selectLoading, selectPaginatedProducts, selectSelectedCategory } from '../../state/products.selectors';
import * as ProductsActions from '../../state/products.actions';
import * as CartActions from './../../../cart/state/cart.actions';
import { selectCart } from './../../../cart/state/cart.selectors';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProductListsComponent {
  private destroy$ = new Subject<void>();

  products$: Observable<Product[]>;
  categories$: Observable<string[]>;
  selectedCategory$: Observable<string>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  filtersForm: FormGroup;
  Min_range: number = 1;
  Max_range: number = 1000;
  filtersVisible = false;


  constructor(private store: Store , private fb: FormBuilder) {
    this.products$ = this.store.select(selectPaginatedProducts);
    this.categories$ = this.store.select(selectCategories);
    this.selectedCategory$ = this.store.select(selectSelectedCategory);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);

    this.filtersForm = this.fb.group({
      searchTerm: [''],
      range: this.fb.control({ point1: 1, point2: 10000 }),
      min: [0],
      max: [Infinity],
      category: [''],
      sortBy: [null],
      sortOrder: [null],
      page: [1],
      pageSize: [this.pageSize]
    });



  }


_onPoint1Changed(val: number) {
  this.Min_range = val;
}

_onPoint2Changed(val: number) {
  this.Max_range = val;
}

applyRange(): void {
  this.filtersForm.get('min')?.setValue(this.Min_range, { emitEvent: true });
  this.filtersForm.get('max')?.setValue(this.Max_range, { emitEvent: true });
}

ngOnInit(): void {
  this.store.dispatch(ProductsActions.loadProducts());
  this.store.dispatch(ProductsActions.loadCategories());

  this.store.select(selectFilteredProducts)
    .pipe(takeUntil(this.destroy$))
    .subscribe(products => {
      this.totalPages = Math.ceil(products.length / this.pageSize);

      if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPage = this.totalPages;
        const filters = { ...this.filtersForm.value, page: this.currentPage };
        this.store.dispatch(ProductsActions.updateFilters({ filters }));
      }
    });

  const searchTerm$ = this.filtersForm.get('searchTerm')!.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map((searchTerm) => ({
      ...this.filtersForm.value,
      searchTerm,
    }))
  );


  const otherFilters$ = this.filtersForm.valueChanges.pipe(
    map((filters) => ({
      ...filters,
      searchTerm: this.filtersForm.get('searchTerm')!.value,
      min: this.filtersForm.get('min')!.value,
      max: this.filtersForm.get('max')!.value,
    }))
  );

  merge(searchTerm$, otherFilters$)
    .pipe(takeUntil(this.destroy$))
    .subscribe((filters) => {
      this.store.dispatch(ProductsActions.updateFilters({ filters }));
      this.store.dispatch(ProductsActions.loadProducts());
    });
}


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCategorySelect(category: string): void {
    this.store.dispatch(ProductsActions.selectCategory({ category }));
  }

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  updatePagination() {
    const filters = {
      ...this.filtersForm.value,
      page: this.currentPage,
      pageSize: this.pageSize
    };
    this.store.dispatch(ProductsActions.updateFilters({ filters }));
    this.store.dispatch(ProductsActions.loadProducts());
  }

  onPageSizeChange(event: Event) {
    const newSize = +(event.target as HTMLSelectElement).value;
    this.pageSize = newSize;
    this.currentPage = 1;
    this.updatePagination();
  }

  cartItems$ = this.store.select(selectCart);

  addToCart(product: Product) {
    this.store.dispatch(CartActions.addToCart({ product }));
  }

  removeFromCart(productId: number) {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  isInCart(productId: number): Observable<boolean> {
    return this.cartItems$.pipe(
      map(items => items.some(item => item.id === productId))
    );
  }

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }


  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }
}

