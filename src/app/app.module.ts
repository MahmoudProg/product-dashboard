import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsModule } from './features/products/products.module';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { FavoritesModule } from './features/favorites/favorites.module';
import { CartModule } from './features/cart/cart.module';
// import { SharedModule } from './shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    // NgxSkeletonLoaderModule,
    NgxSkeletonLoaderModule.forRoot({
        animation: 'progress',
        theme: {
          'border-radius': '5px',
          'background-color': '#f0f0f0',
        },
      }),
    // Core & Shared
    CoreModule,
    // SharedModule,

    // Features
    ProductsModule,
    CartModule,
    FavoritesModule,

    // NgRx root
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
