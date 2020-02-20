import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrenciesService } from '@app/home/currencies.service';
import { finalize } from 'rxjs/operators';
import { Currency } from '@app/types/models';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading = false;
  currencies: MatTableDataSource<Currency>;
  displayedColumns: string[];
  filters = {
    isSupportedInUS: false,
    supportsTestMode: false,
    random: true
  };

  constructor(private currenciesService: CurrenciesService) {
    this.displayedColumns = ['index', 'name', 'code'];
  }

  ngOnInit() {
    this.isLoading = true;
    this.currenciesService
      .getCurrencies()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(res => {
        this.currencies = new MatTableDataSource<Currency>(res);
        this.currencies.sort = this.sort;
        this.currencies.filterPredicate = (currency, filter): boolean => {
          if (filter !== 'random') {
            const spitedFilter = filter.split('|');
            return currency[spitedFilter[0]] === Boolean(spitedFilter[1]);
          }
          return true;
        };
      });
  }

  filter(filterKey: string): void {
    console.log(this.filters);
    if (filterKey !== 'random') {
      this.currencies.filter = `${filterKey}|${this.filters[filterKey]}`;
      this.filters.random = false;
    } else {
      this.currencies.filter = `random`;
      this.filters.supportsTestMode = false;
      this.filters.supportsTestMode = false;
    }
  }
}
