import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  // username: any;
  ngOnInit(): void {
    // let username;
  }
  username = localStorage.getItem('username');
  // console.log(username);

  logout() {
    localStorage.removeItem('username');
  }
}
