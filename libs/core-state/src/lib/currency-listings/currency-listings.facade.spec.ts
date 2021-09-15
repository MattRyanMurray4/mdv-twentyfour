import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as CurrencyListingsActions from './currency-listings.actions';
import { CurrencyListingsEffects } from './currency-listings.effects';
import { CurrencyListingsFacade } from './currency-listings.facade';
import { CurrencyListingsEntity } from './currency-listings.models';
import {
  CURRENCY_LISTINGS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './currency-listings.reducer';
import * as CurrencyListingsSelectors from './currency-listings.selectors';

interface TestSchema {
  currencyListings: State;
}

describe('CurrencyListingsFacade', () => {
  let facade: CurrencyListingsFacade;
  let store: Store<TestSchema>;
  const createCurrencyListingsEntity = (
    id: string,
    name = ''
  ): CurrencyListingsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CURRENCY_LISTINGS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CurrencyListingsEffects]),
        ],
        providers: [CurrencyListingsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CurrencyListingsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allCurrencyListings$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allCurrencyListings$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadCurrencyListingsSuccess` to manually update list
     */
    it('allCurrencyListings$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allCurrencyListings$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        CurrencyListingsActions.loadCurrencyListingsSuccess({
          currencyListings: [
            createCurrencyListingsEntity('AAA'),
            createCurrencyListingsEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allCurrencyListings$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
