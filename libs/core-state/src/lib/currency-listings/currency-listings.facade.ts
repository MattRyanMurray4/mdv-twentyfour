import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as CurrencyListingsActions from './currency-listings.actions';
import * as CurrencyListingsFeature from './currency-listings.reducer';
import * as CurrencyListingsSelectors from './currency-listings.selectors';

@Injectable()
export class CurrencyListingsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(CurrencyListingsSelectors.getCurrencyListingsLoaded)
  );
  allCurrencyListings$ = this.store.pipe(
    select(CurrencyListingsSelectors.getAllCurrencyListings)
  );
  selectedCurrencyListings$ = this.store.pipe(
    select(CurrencyListingsSelectors.getSelected)
  );

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CurrencyListingsActions.init());
  }
}
