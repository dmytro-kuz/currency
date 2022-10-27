import { Component, OnInit } from '@angular/core';
import { tap, timeout } from 'rxjs';
import { CurrencyService } from '../currency.service';
import { Rate } from 'src/app/shared/interfaces/rate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usd?: Rate;
  eur?: Rate;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService
      .getExchangeRate()
      .pipe(tap())
      .subscribe((rates) => {
        rates.forEach((rate: any) => {
          if (rate.ccy === 'USD') {
            this.usd = {
              buy: Number(rate.buy).toFixed(2),
              sale: Number(rate.sale).toFixed(2),
            };
          }
          if (rate.ccy === 'EUR') {
            this.eur = {
              buy: Number(rate.buy).toFixed(2),
              sale: Number(rate.sale).toFixed(2),
            };
          }
        });
      });
  }
}
