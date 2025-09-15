import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListsComponent } from './pages/product-lists/product-lists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { StoreModule } from '@ngrx/store';
import { productsFeatureKey, productsReducer } from './state/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './state/products.effects';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


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
    NgxSkeletonLoaderModule,
    ScrollingModule,
    SharedModule,
    TranslateModule,

    // Register products feature state
    StoreModule.forFeature(productsFeatureKey, productsReducer),
    EffectsModule.forFeature([ProductsEffects]),

  ],
  exports: [
    ProductListsComponent
  ]
})
export class ProductsModule { }
