import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListsComponent } from './pages/product-lists/product-lists.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductListsComponent 
  ]
})
export class ProductsModule { }
