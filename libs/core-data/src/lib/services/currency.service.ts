import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyListing, Rate } from '@curr-con/api-interfaces';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  // private model = 'currencyListings';
  constructor(private http: HttpClient) {}

  all(): Observable<CurrencyListing> {
    return this.http
      .get<CurrencyListing>(this.getApi())
      .pipe(map((response) => response));
  }

  private getApi() {
    return `${environment.apiUrl}`;
  }
}

// private getApiById(id: string) {
//   return `${this.getApi()}${id}`;
// }
