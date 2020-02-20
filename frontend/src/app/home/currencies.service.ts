import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '@app/types/models';
import { map } from 'rxjs/operators';

const routes = {
  getCurrencies: () => `/currencies`
};

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  constructor(private readonly _httpClient: HttpClient) {}

  public getCurrencies(): Observable<Currency[]> {
    return this._httpClient
      .get<Currency[]>(routes.getCurrencies())
      .pipe(map(currencies => currencies.map(c => new Currency(c))));
  }
}
