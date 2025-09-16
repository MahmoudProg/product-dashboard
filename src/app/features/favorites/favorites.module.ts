import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { favoritesFeatureKey, favoritesReducer } from './state/favorites.reducer';
import { FavoritesEffects } from './state/favorites.effects';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(favoritesFeatureKey, favoritesReducer),
    EffectsModule.forFeature([FavoritesEffects]),
  ]
})
export class FavoritesModule { }
