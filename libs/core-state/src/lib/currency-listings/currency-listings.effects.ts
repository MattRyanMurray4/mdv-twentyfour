import { CurrencyService } from '@curr-con/core-data';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadCurrencyListings,
  loadCurrencyListingsFailure,
  loadCurrencyListingsSuccess,
} from './currency-listings.actions';
@Injectable()
export class CurrencyListingsEffects {
  loadCurrencyListings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrencyListings),
      switchMap(() =>
        this.currencyService.all().pipe(
          map((currencyListings) =>
            loadCurrencyListingsSuccess({ currencyListings })
          ),
          catchError((error) => of(loadCurrencyListingsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private currencyService: CurrencyService
  ) {}
}
