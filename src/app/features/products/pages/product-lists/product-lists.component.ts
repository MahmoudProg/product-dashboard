import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, merge, Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/core/models/Product ';
import { selectCategories, selectError, selectFilteredProducts, selectLoading, selectPaginatedProducts, selectSelectedCategory } from '../../state/products.selectors';
import * as ProductsActions from '../../state/products.actions';
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
  constructor(private store: Store , private fb: FormBuilder) {
    this.products$ = this.store.select(selectPaginatedProducts);
    this.categories$ = this.store.select(selectCategories);
    this.selectedCategory$ = this.store.select(selectSelectedCategory);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);


    this.filtersForm = this.fb.group({
      searchTerm: [''],
      min: [0],
      max: [Infinity],
      category: [''],
      sortBy: [null],
      sortOrder: [null],
      page: [1],
      pageSize: [this.pageSize]

    });
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.loadProducts());
    this.store.dispatch(ProductsActions.loadCategories());

     // Reactive: أي تغيير يروح للـ store
    this.filtersForm.valueChanges.subscribe(filters => {
      this.store.dispatch(ProductsActions.updateFilters({ filters }));
    });

    // تحديث totalPages بناءً على عدد المنتجات بعد الفلترة
    this.store.select(selectFilteredProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.totalPages = Math.ceil(products.length / this.pageSize);

        // فقط صحح الصفحة الحالية لو زادت عن totalPages
        if (this.currentPage > this.totalPages && this.totalPages > 0) {
          this.currentPage = this.totalPages;
          // هنا ممكن تعمل dispatch للـ page فقط، لكن خلي بالك ما تعملش loadProducts تاني
          const filters = { ...this.filtersForm.value, page: this.currentPage };
          this.store.dispatch(ProductsActions.updateFilters({ filters }));
          // بدون loadProducts!
        }
      });

    // ✅ نعمل merge بين searchTerm ببطيء وباقي القيم بسرعة
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
        searchTerm: this.filtersForm.get('searchTerm')!.value, // نرجع آخر قيمة للـ searchTerm
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
  pageSize = 4;
  totalPages = 1; // هتتحسب بناءً على عدد المنتجات

  // تحديث الصفحة
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

  // dispatch للتحديث
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
}

