import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListsComponent } from './product-lists.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as ProductsActions from '../../state/products.actions';
import * as CartActions from '../../../cart/state/cart.actions';
import { Product } from 'src/app/core/models/Product ';
import { TranslateModule } from '@ngx-translate/core';



describe('ProductListsComponent', () => {
  let component: ProductListsComponent;
  let fixture: ComponentFixture<ProductListsComponent>;
  let store: MockStore;
  const initialState = {
    products: [],
    cart: [],
    selectedCategory: null
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,TranslateModule.forRoot()],
      declarations: [ProductListsComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProducts and loadCategories on ngOnInit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(ProductsActions.loadProducts());
    expect(dispatchSpy).toHaveBeenCalledWith(ProductsActions.loadCategories());
  });

  it('should update filters when applyRange is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.Min_range = 50;
    component.Max_range = 500;
    component.applyRange();
    const filters = {
      ...component.filtersForm.value,
      min: 50,
      max: 500
    };
    expect(dispatchSpy).toHaveBeenCalledWith(ProductsActions.updateFilters({ filters }));
  });

  it('should dispatch addToCart', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const product: Product = { id: 1, title: 'Test', price: 100, category: 'Cat', description: '', image: '', rating: { rate: 5, count: 10 } };
    component.addToCart(product);
    expect(dispatchSpy).toHaveBeenCalledWith(CartActions.addToCart({ product }));
  });

  it('should dispatch removeFromCart', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.removeFromCart(1);
    expect(dispatchSpy).toHaveBeenCalledWith(CartActions.removeFromCart({ productId: 1 }));
  });

  it('should call onCategorySelect', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onCategorySelect('Cat');
    expect(dispatchSpy).toHaveBeenCalledWith(ProductsActions.selectCategory({ category: 'Cat' }));
  });
});
