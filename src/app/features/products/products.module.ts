import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListsComponent } from './pages/product-lists/product-lists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { StoreModule } from '@ngrx/store';
import { productsFeatureKey, productsReducer } from './state/products.reducer';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(productsFeatureKey, productsReducer),
  ],
  exports: [
    ProductListsComponent
  ]
})
export class ProductsModule { }
