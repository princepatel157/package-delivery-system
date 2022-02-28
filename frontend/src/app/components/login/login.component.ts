import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  username: string = '';
  password: string = '';

  // get login form values
  getLoginValues(val: any) {
    this.username = val.username;
    this.password = val.password;
  }

  ngOnInit(): void {}
}
