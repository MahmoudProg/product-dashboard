import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CartFeatureKey, CartReducer } from './state/cart.reducer';
import { CartEffects } from './state/cart.effects';
@NgModule({
  declarations: [
    // هنا تحط أي components تخص الكارت (CartListComponent, CartSummaryComponent, ...)
  ],
  imports: [
    CommonModule,

    // Register cart feature state
    StoreModule.forFeature(CartFeatureKey, CartReducer),
    EffectsModule.forFeature([CartEffects]),
  ]
})
export class CartModule { }
