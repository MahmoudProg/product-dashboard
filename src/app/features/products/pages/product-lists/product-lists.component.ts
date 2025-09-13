import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/Product ';
import { selectCategories, selectError, selectFilteredProducts, selectLoading, selectSelectedCategory } from '../../state/products.selectors';
import * as ProductsActions from '../../state/products.actions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProductListsComponent {


  products$: Observable<Product[]>;
  categories$: Observable<string[]>;
  selectedCategory$: Observable<string>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  filtersForm: FormGroup;
  constructor(private store: Store , private fb: FormBuilder) {
    this.products$ = this.store.select(selectFilteredProducts);
    this.categories$ = this.store.select(selectCategories);
    this.selectedCategory$ = this.store.select(selectSelectedCategory);

    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);

    this.filtersForm = this.fb.group({
      searchTerm: [''],
      min: [0],
      max: [Infinity]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.loadProducts());
    this.store.dispatch(ProductsActions.loadCategories());

     // Reactive: أي تغيير يروح للـ store
    this.filtersForm.valueChanges.subscribe(filters => {
      this.store.dispatch(ProductsActions.setFilters({ filters }));
    });
  }

  onCategorySelect(category: string): void {
    this.store.dispatch(ProductsActions.selectCategory({ category }));
  }

  // onSearch(term: string): void {
  //   this.store.dispatch(ProductsActions.setSearchTerm({ searchTerm: term }));
  // }

  // onPriceChange(min: number, max: number): void {
  //   this.store.dispatch(
  //     ProductsActions.setPriceRange({ min: +min || 0, max: +max || Infinity })
  //   );
  // }
}

