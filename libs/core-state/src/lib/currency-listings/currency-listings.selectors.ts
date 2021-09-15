import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CURRENCY_LISTINGS_FEATURE_KEY,
  State,
  currencyListingsAdapter,
} from './currency-listings.reducer';

// Lookup the 'CurrencyListings' feature state managed by NgRx
export const getCurrencyListingsState = createFeatureSelector<State>(
  CURRENCY_LISTINGS_FEATURE_KEY
);

const { selectAll, selectEntities } = currencyListingsAdapter.getSelectors();

export const getCurrencyListingsLoaded = createSelector(
  getCurrencyListingsState,
  (state: State) => state.loaded
);

export const getCurrencyListingsError = createSelector(
  getCurrencyListingsState,
  (state: State) => state.error
);

export const getAllCurrencyListings = createSelector(
  getCurrencyListingsState,
  (state: State) => selectAll(state)
);

export const getCurrencyListingsEntities = createSelector(
  getCurrencyListingsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCurrencyListingsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCurrencyListingsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
