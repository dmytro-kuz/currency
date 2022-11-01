import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private apiService: ApiService) {}

  currencyList: string[] = ['UAH'];

  getExchangeRate(): Observable<any> {
    return this.apiService.get();
  }
}
