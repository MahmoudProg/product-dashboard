import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { favoritesFeatureKey, favoritesReducer } from './state/favorites.reducer';
import { FavoritesEffects } from './state/favorites.effects';

@NgModule({
  declarations: [
    // هنا تحط أي components تخص الكارت (FavoritesListComponent, FavoritesSummaryComponent, ...)
  ],
  imports: [
    CommonModule,

    // Register Favorites feature state
    StoreModule.forFeature(favoritesFeatureKey, favoritesReducer),
    EffectsModule.forFeature([FavoritesEffects]),
  ]
})
export class FavoritesModule { }
