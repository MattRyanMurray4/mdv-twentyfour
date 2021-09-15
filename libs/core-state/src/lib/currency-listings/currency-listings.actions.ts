import { CurrencyListing } from '@curr-con/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[CurrencyListings Page] Init');

export const loadCurrencyListings = createAction(
  '[CurrencyListings] Load All Currency Listings'
);

export const loadCurrencyListingsSuccess = createAction(
  '[CurrencyListings] Load Currency Listings Success',
  props<{ currencyListings: CurrencyListing[] }>()
);

export const loadCurrencyListingsFailure = createAction(
  '[CurrencyListings] Load Currency Listings Failure',
  props<{ error: any }>()
);
