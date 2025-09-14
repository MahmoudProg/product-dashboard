// products.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map(products => ProductsActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductsActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadCategories),
      mergeMap(() =>
        this.productService.getCategories().pipe(
          map(categories => ProductsActions.loadCategoriesSuccess({ categories })),
          catchError(error => of(ProductsActions.loadCategoriesFailure({ error })))
        )
      )
    )
  );

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductById),
      mergeMap(({ id }) =>
        //الـ +id لتحويل الـ string اللي جاية من الـ route لـ number (لأن الـ service متوقع number).
        this.productService.getProductById(+id).pipe(  // نمرر id كرقم
          map((product) => ProductsActions.loadProductByIdSuccess({ product })),
          catchError((error) =>
            of(ProductsActions.loadProductByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );

}
