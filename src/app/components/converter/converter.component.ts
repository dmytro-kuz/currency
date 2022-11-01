import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { CurrencyService } from '../services/currency.service';
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
  currencyList: string[] = this.currencyService.currencyList;
  currencyForm?: FormGroup;
  rates: any = { USD: 0, EUR: 0, BTC: 0 };

  ngOnInit() {
    this.currencyService
      .getExchangeRate()
      .pipe(first())
      .subscribe((data) => {
        this.rates.USD = data[0].buy;
        this.rates.EUR = data[1].buy;
        this.rates.BTC = data[2].buy * data[0].buy;
        this.currencyForm?.patchValue({
          secondInput: [Number(data[0].buy).toFixed(2)],
        });
      });
    this.initForm();
  }

  initForm() {
    this.currencyForm = this.formBuilder.group({
      firstInput: [1],
      firstSelect: ['USD'],
      secondInput: [],
      secondSelect: ['UAH'],
    });
  }

  generateInput(a = 1, b = 1, c = 1) {
    return Number((a * b) / c).toFixed(2);
  }

  directConversion() {
    const formValue = this.currencyForm?.value;
    if (formValue.secondSelect === 'UAH') {
      this.patchSecondInput(
        this.generateInput(
          formValue.firstInput,
          this.rates[formValue.firstSelect]
        )
      );
    }
    if (formValue.firstSelect === formValue.secondSelect) {
      this.patchSecondInput(formValue.firstInput);
    }
    if (formValue.secondSelect !== 'UAH') {
      if (formValue.firstSelect === 'UAH') {
        this.patchSecondInput(
          this.generateInput(
            formValue.firstInput,
            1,
            this.rates[formValue.secondSelect]
          )
        );
      } else {
        this.patchSecondInput(
          this.generateInput(
            formValue.firstInput,
            this.rates[formValue.firstSelect],
            this.rates[formValue.secondSelect]
          )
        );
      }
    }
  }

  reverseConversion() {
    const formValue = this.currencyForm?.value;
    if (formValue.firstSelect === 'UAH') {
      this.patchFirstInput(
        this.generateInput(
          formValue.secondInput,
          this.rates[formValue.secondSelect]
        )
      );
    }
    if (formValue.firstSelect === formValue.secondSelect) {
      this.patchFirstInput(formValue.firstInput);
    }
    if (formValue.firstSelect !== 'UAH') {
      if (formValue.secondSelect === 'UAH') {
        this.patchFirstInput(
          this.generateInput(
            formValue.secondInput,
            1,
            this.rates[formValue.firstSelect]
          )
        );
      } else {
        this.patchFirstInput(
          this.generateInput(
            formValue.secondInput,
            this.rates[formValue.secondSelect],
            this.rates[formValue.firstSelect]
          )
        );
      }
    }
  }

  patchSecondInput(input: any) {
    this.currencyForm?.patchValue({
      secondInput: input,
    });
  }

  patchFirstInput(input: any) {
    this.currencyForm?.patchValue({
      firstInput: input,
    });
  }

  inverseCurrency() {
    this.currencyForm?.patchValue({
      firstInput: [this.currencyForm?.value.secondInput],
    });
    this.directConversion();
  }
}
