import { Component, OnInit } from '@angular/core';
import { first, tap } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';
import { Rate } from 'src/app/shared/interfaces/rate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usd?: Rate;
  eur?: Rate;
  date: Date = new Date();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService
      .getExchangeRate()
      .pipe(first())
      .subscribe((rates) => {
        rates.forEach((rate: any) => {
          console.log(rate);

          this.currencyService.currencyList.push(rate.ccy);
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