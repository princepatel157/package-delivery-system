import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  constructor(private router: Router) {}
  parcelType = '';
  weight = '';
  pickAdd = '';
  dropAdd = '';
  cost: any;
  trackingId: any;

  ngOnInit(): void {
    axios
      .get('http://localhost:3000/api/order', {
        params: {
          usename: localStorage.getItem('username'),
        },
      })
      .then((res) => {
        this.parcelType = res.data.parcelType;
        this.weight = res.data.weight;
        this.pickAdd = res.data.pickup;
        this.dropAdd = res.data.drop;
        this.cost = res.data.cost;
      });
  }

  checkout() {
    const trackingNumber = (pr = 'UB775', su = 'HK') => {
      for (let i = 0; i < 5; i++) pr += ~~(Math.random() * 10);
      return pr + su;
    };
    this.trackingId = trackingNumber();
    console.log(this.trackingId);

    axios
      .post('http://localhost:3000/api/checkout', {
        trackingId: this.trackingId,
        username: localStorage.getItem('username'),
        parcelType: this.parcelType,
        weight: this.weight,
        pickup: this.pickAdd,
        drop: this.dropAdd,
        cost: this.cost,
      })
      .then((res) => {
        window.alert('order Placed');
        this.router.navigateByUrl('checkout');
      })
      .catch((err) => {
        window.alert('not able to proceed');
      });

    axios.post('http://localhost:3000/api/deleteOrder', {
      username: localStorage.getItem('username'),
    });
  }
}
