import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string =
    'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

  constructor(private httpClient: HttpClient) {}

  get<T>(): Observable<T> {
    return this.httpClient.get<T>(this.url);
  }
}
