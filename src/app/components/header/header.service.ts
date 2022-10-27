import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private apiService: ApiService) {}
  getExchangeRate(): Observable<any> {
    return this.apiService.get();
  }
}
