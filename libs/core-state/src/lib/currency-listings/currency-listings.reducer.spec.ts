import { Action } from '@ngrx/store';

import * as CurrencyListingsActions from './currency-listings.actions';
import { CurrencyListingsEntity } from './currency-listings.models';
import { State, initialState, reducer } from './currency-listings.reducer';

describe('CurrencyListings Reducer', () => {
  const createCurrencyListingsEntity = (
    id: string,
    name = ''
  ): CurrencyListingsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid CurrencyListings actions', () => {
    it('loadCurrencyListingsSuccess should return the list of known CurrencyListings', () => {
      const currencyListings = [
        createCurrencyListingsEntity('PRODUCT-AAA'),
        createCurrencyListingsEntity('PRODUCT-zzz'),
      ];
      const action = CurrencyListingsActions.loadCurrencyListingsSuccess({
        currencyListings,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
