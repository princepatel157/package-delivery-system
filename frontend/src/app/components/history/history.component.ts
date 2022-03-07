import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(private router: Router) {}
  trackingId = '';
  parcelType = '';
  weight = '';
  pickAdd = '';
  dropAdd = '';
  cost: any;

  dataArray: any;

  ngOnInit(): void {
    axios
      .get('http://localhost:3000/api/history', {
        params: {
          usename: localStorage.getItem('username'),
        },
      })
      .then((res) => {
        this.dataArray = res.data.orders;
        console.log(this.dataArray);
      });
  }
  placeOrder() {
    this.router.navigateByUrl('');
  }
}
