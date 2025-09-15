import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListsComponent } from './pages/product-lists/product-lists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { StoreModule } from '@ngrx/store';
import { productsFeatureKey, productsReducer } from './state/products.reducer';
import { favoritesCartFeatureKey, favoritesCartReducer } from './state/favorites-cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './state/products.effects';
import { FavoritesCartEffects } from './state/favorites-cart.effects';


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

    // Register products feature state
    StoreModule.forFeature(productsFeatureKey, productsReducer),
    EffectsModule.forFeature([ProductsEffects]),

    // Register favorites/cart feature state
    // StoreModule.forFeature(favoritesCartFeatureKey, favoritesCartReducer),
    // EffectsModule.forFeature([FavoritesCartEffects]),

  ],
  exports: [
    ProductListsComponent
  ]
})
export class ProductsModule { }
