import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  parcelType: string = '';
  parcelWeight: any;
  basePrice = 100;
  weightMargin = 30;
  additionalCost = 0;
  totalCost = 0;
  fileName = null;

  onFileSelect(event: any) {
    console.log(event);
    this.fileName = event.target.files[0]['name'];
  }

  calCost(ptype: string, weight: any) {
    // initialize to zero
    this.additionalCost = 0;
    this.totalCost = 0;
    if (ptype != 'light') {
      this.additionalCost += 50;
    }
    if (weight > 1 && weight <= 3) {
      this.additionalCost += 20;
    } else if (weight > 3) {
      let multiple = weight - 3;
      this.additionalCost += 20 * multiple;
    }
    this.totalCost = this.basePrice + this.additionalCost;

    this.parcelType = ptype;
    this.parcelWeight = weight;
    console.log('Type: ', this.parcelType);
    console.log('Weight: ', this.parcelWeight);
    console.log('total cost: ', this.totalCost);
  }

  // get ngform detail
  getParcelData(form: any) {
    this.parcelType = form.ptype;
    this.parcelWeight = form.weight;
    console.log(this.parcelType);
    console.log(this.parcelWeight);
  }
  ngOnInit(): void {}
}
