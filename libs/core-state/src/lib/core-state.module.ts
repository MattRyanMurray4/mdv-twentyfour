import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCurrency from './currency/currency.reducer';
import { CurrencyEffects } from './currency/currency.effects';
import { CurrencyFacade } from './currency/currency.facade';
import * as fromCurrencyListings from './currency-listings/currency-listings.reducer';
import { CurrencyListingsEffects } from './currency-listings/currency-listings.effects';
import { CurrencyListingsFacade } from './currency-listings/currency-listings.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCurrency.CURRENCY_FEATURE_KEY,
      fromCurrency.reducer
    ),
    EffectsModule.forFeature([CurrencyEffects]),
    StoreModule.forFeature(
      fromCurrencyListings.CURRENCY_LISTINGS_FEATURE_KEY,
      fromCurrencyListings.reducer
    ),
    EffectsModule.forFeature([CurrencyListingsEffects]),
  ],
  providers: [CurrencyFacade, CurrencyListingsFacade],
})
export class CoreStateModule {}
