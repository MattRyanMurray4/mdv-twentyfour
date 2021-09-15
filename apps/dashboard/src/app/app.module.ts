import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyComponent } from './currency/currency.component';
import { CurrencyListComponent } from './currency/currency-list/currency-list.component';
import { CurrencyDetailsComponent } from './currency/currency-details/currency-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, CurrencyComponent, CurrencyListComponent, CurrencyDetailsComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
