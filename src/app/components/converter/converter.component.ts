import { Component, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { CurrencyService } from '../currency.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  constructor(
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder
  ) {}
  currency: string[] = this.currencyService.currency;
  rate: any;
  firstInput: any;
  secondInput: any;
  currencyForm?: FormGroup;

  ngOnInit() {
    this.currencyService
      .getExchangeRate()
      .pipe(first())
      .subscribe((data) => {
        this.rate = data;
        this.currencyForm?.patchValue({
          secondInput: [Number(data[0].sale).toFixed(2)],
        });
      });

    this.formCreation();
  }

  formCreation() {
    console.log(this.rate);

    this.currencyForm = this.formBuilder.group({
      firstInput: [1],
      firstSelect: ['UAH'],
      secondInput: [],
      secondSelect: ['USD'],
    });
  }

  directConversion(input: any) {
    console.log('input', input.target.value);
  }

  reversConversion(input: any) {}
}
