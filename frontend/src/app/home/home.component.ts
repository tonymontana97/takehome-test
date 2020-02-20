import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrenciesService } from '@app/home/currencies.service';
import { finalize } from 'rxjs/operators';
import { Currency } from '@app/types/models';
import { MatSort, MatSortable, MatTableDataSource } from '@angular/material';

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
    supportsTestMode: false
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
          const filtersCurrent = JSON.parse(filter);
          if (filtersCurrent.isSupportedInUS) {
            return currency.isSupportedInUS === filtersCurrent.isSupportedInUS;
          }
          if (filtersCurrent.supportsTestMode) {
            return currency.supportsTestMode === filtersCurrent.supportsTestMode;
          }

          return true;
        };
      });
  }

  filter(): void {
    this.currencies.filter = JSON.stringify(this.filters);
  }

  randSorting(): void {
    const sortFields = ['id', 'name', 'code', 'createdAt', 'addressRegex'];
    this.sort.sort(({ id: sortFields[Math.floor(Math.random() * sortFields.length)], start: 'asc'}) as MatSortable);
    this.currencies.sort = this.sort;
  }
}
