import { CurrencyListing } from '@curr-con/api-interfaces';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CurrencyListingsActions from './currency-listings.actions';

export const CURRENCY_LISTINGS_FEATURE_KEY = 'currencyListings';

export interface CurrencyListingState extends EntityState<CurrencyListing> {
  selectedId?: string | number; // which CurrencyListings record has been selected
  loaded: boolean; // has the CurrencyListings list been loaded
  error?: string | null; // last known error (if any)
}

export interface CurrencyListingActions extends Action {
  error: string;
}

export interface CurrencyListingsPartialState {
  readonly [CURRENCY_LISTINGS_FEATURE_KEY]: CurrencyListingState;
}

export const currencyListingsAdapter: EntityAdapter<CurrencyListing> =
  createEntityAdapter<CurrencyListing>();

export const initialState: CurrencyListingState =
  currencyListingsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const setLoading = (state: CurrencyListingState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (
  state: CurrencyListingState,
  { error }: CurrencyListingActions
) => ({
  ...state,
  error,
});

const _currencyListingsReducer = createReducer(
  initialState,
  on(CurrencyListingsActions.loadCurrencyListings, setLoading),
  on(CurrencyListingsActions.loadCurrencyListingsFailure, setFailure),
  on(CurrencyListingsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    CurrencyListingsActions.loadCurrencyListingsSuccess,
    (state, { currencyListings }) =>
      currencyListingsAdapter.setAll(currencyListings, {
        ...state,
        loaded: true,
      })
  ),
  on(
    CurrencyListingsActions.loadCurrencyListingsFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function currencyListingsReducer(
  state: CurrencyListingState | undefined,
  action: Action
) {
  return _currencyListingsReducer(state, action);
}
