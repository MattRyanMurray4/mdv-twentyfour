import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as CurrencyListingsActions from './currency-listings.actions';
import { CurrencyListingsEffects } from './currency-listings.effects';

describe('CurrencyListingsEffects', () => {
  let actions: Observable<Action>;
  let effects: CurrencyListingsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CurrencyListingsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CurrencyListingsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CurrencyListingsActions.init() });

      const expected = hot('-a-|', {
        a: CurrencyListingsActions.loadCurrencyListingsSuccess({
          currencyListings: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
