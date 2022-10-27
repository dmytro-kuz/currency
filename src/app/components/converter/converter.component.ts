import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  foods: any[] = [
    { value: 'usd', viewValue: 'USD' },
    { value: 'eur', viewValue: 'EUR' },
    { value: 'uah', viewValue: 'UAH' },
  ];
}
