import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  constructor() {}
  parcelType = '';
  weight = '';
  pickAdd = '';
  dropAdd = '';
  cost: any;

  ngOnInit(): void {
    axios
      .get('http://localhost:3000/api/gethistory', {
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
}
