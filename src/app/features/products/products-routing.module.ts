//products-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductListsComponent } from './pages/product-lists/product-lists.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ProductsComponent,
  //   children: [
  //     { path: '', component: ProductListsComponent },       // /products
  //     { path: ':id', component: ProductDetailsComponent }    // /products/:id
  //   ]
  // }
  { path: '', component: ProductListsComponent }, // /products
  { path: ':id', component: ProductDetailsComponent } // /products/:id
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
