import { Component, OnInit } from '@angular/core';
import { NGB_DATEPICKER_CALENDAR_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { Obj } from '@popperjs/core';
import axios from 'axios';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor() {}

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
}
