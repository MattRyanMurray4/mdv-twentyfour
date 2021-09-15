import { CurrencyListingsEntity } from './currency-listings.models';
import {
  currencyListingsAdapter,
  CurrencyListingsPartialState,
  initialState,
} from './currency-listings.reducer';
import * as CurrencyListingsSelectors from './currency-listings.selectors';

describe('CurrencyListings Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCurrencyListingsId = (it: CurrencyListingsEntity) => it.id;
  const createCurrencyListingsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CurrencyListingsEntity);

  let state: CurrencyListingsPartialState;

  beforeEach(() => {
    state = {
      currencyListings: currencyListingsAdapter.setAll(
        [
          createCurrencyListingsEntity('PRODUCT-AAA'),
          createCurrencyListingsEntity('PRODUCT-BBB'),
          createCurrencyListingsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('CurrencyListings Selectors', () => {
    it('getAllCurrencyListings() should return the list of CurrencyListings', () => {
      const results = CurrencyListingsSelectors.getAllCurrencyListings(state);
      const selId = getCurrencyListingsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CurrencyListingsSelectors.getSelected(
        state
      ) as CurrencyListingsEntity;
      const selId = getCurrencyListingsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getCurrencyListingsLoaded() should return the current "loaded" status', () => {
      const result = CurrencyListingsSelectors.getCurrencyListingsLoaded(state);

      expect(result).toBe(true);
    });

    it('getCurrencyListingsError() should return the current "error" state', () => {
      const result = CurrencyListingsSelectors.getCurrencyListingsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
