// src/app/features/products/state/products.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { of, timer, OperatorFunction } from 'rxjs';
import { catchError, map, mergeMap, retryWhen, scan, delayWhen } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/Product ';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  // <-- مهم: نعلن النوع Generic هنا عشان TypeScript يعرف اللي رايح وراجع
  private retryWithBackoff<T>(maxRetry = 3, delayMs = 1000): OperatorFunction<T, T> {
    return retryWhen(errors =>
      errors.pipe(
        scan((retryCount, error) => {
          if (retryCount >= maxRetry) {
            throw error; // بعد ما نزيد عن الحد نرمي الخطأ للخروج من retryWhen
          }
          return retryCount + 1;
        }, 0),
        // نأخر كل محاولة حسب رقم المحاولة باستخدام timer
        delayWhen((retryCount) => timer(retryCount * delayMs))
      )
    );
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          this.retryWithBackoff<Product[]>(
            environment.retryConfig.maxRetry,
            environment.retryConfig.delayMs
          ),
          map((products: Product[]) =>
            ProductsActions.loadProductsSuccess({ products })
          ),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error: error?.message ?? String(error) }))
          )
        )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadCategories),
      mergeMap(() =>
        this.productService.getCategories().pipe(
          this.retryWithBackoff<string[]>(
            environment.retryConfig.maxRetry,
            environment.retryConfig.delayMs
          ),
          map((categories: string[]) =>
            ProductsActions.loadCategoriesSuccess({ categories })
          ),
          catchError((error) =>
            of(ProductsActions.loadCategoriesFailure({ error: error?.message ?? String(error) }))
          )
        )
      )
    )
  );

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductById),
      mergeMap(({ id }) =>
        this.productService.getProductById(+id).pipe(
          this.retryWithBackoff<Product>(
            environment.retryConfig.maxRetry,
            environment.retryConfig.delayMs
          ),
          map((product: Product) =>
            ProductsActions.loadProductByIdSuccess({ product })
          ),
          catchError((error) =>
            of(ProductsActions.loadProductByIdFailure({ error: error?.message ?? String(error) }))
          )
        )
      )
    )
  );
}
