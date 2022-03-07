import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  parcelType: string = '';
  parcelWeight: any;
  basePrice = 100;
  weightMargin = 30;
  additionalCost = 0;
  totalCost = 0;
  fileName = null;
  dimention = '';
  pickupAdd: any;
  dropAdd: any;
  ccoupon: string = '';

  onFileSelect(event: any) {
    console.log(event);
    this.fileName = event.target.files[0]['name'];
  }

  // check coupon code and apply
  checkCoupon(val: any) {
    if (val == 'FLAT50') {
      this.ccoupon = 'Coupon Applied';
      this.basePrice = 100;
      this.basePrice = this.basePrice - 50;
    } else if (val == 'FLAT10') {
      this.ccoupon = 'Coupon Applied';
      this.basePrice = 100;
      this.basePrice = this.basePrice - 10;
    } else {
      this.ccoupon = 'Invalid Coupon';
      this.basePrice = 100;
    }
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
  }

  // get ngform detail
  getParcelData(form: any) {
    this.parcelType = form.ptype;
    this.parcelWeight = form.weight;
    this.pickupAdd =
      form.pick1 + ' ' + form.pick2 + ' ' + form.pcity + '- ' + form.ppin;
    this.dropAdd =
      form.drop1 + ' ' + form.drop2 + ' ' + form.dcity + '- ' + form.dpin;
    console.log(this.parcelType);
    console.log(this.parcelWeight);
    console.log(this.pickupAdd);
    console.log(this.dropAdd);

    // checking validation
    if (this.parcelType == '') {
      window.alert('Please Enter Parcel Type');
    } else if (this.parcelWeight == '') {
      window.alert('Please Enter Parcel Weight');
    } else if (form.pick1 == '') {
      window.alert('Please Enter Pickup Address');
    } else if (form.drop1 == '') {
      window.alert('Please Enter Drop Addres');
    } else if (form.pcity == '') {
      window.alert('Please Enter Pickup City');
    } else if (form.ppin == null) {
      window.alert('Please Enter Pickup Pin');
    } else if (form.dcity == '') {
      window.alert('Please Enter Drop City');
    } else if (form.dpin == null) {
      window.alert('Please Enter Drop Pin');
    } else if (this.totalCost == 0) {
      window.alert('Please Calculate Price');
    } else {
      axios.post('http://localhost:3000/api/deleteOrder', {
        username: localStorage.getItem('username'),
      });

      axios
        .post('http://localhost:3000/api/order', {
          username: localStorage.getItem('username'),
          parcelType: this.parcelType,
          weight: this.parcelWeight,
          pickup: this.pickupAdd,
          drop: this.dropAdd,
          cost: this.totalCost,
        })
        .then((res) => {
          window.alert('order processed');
          this.router.navigateByUrl('order');
        });
    }
  }
  ngOnInit(): void {}
}
