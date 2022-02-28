import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor() {}

  // sign up values
  username = '';
  email = '';
  phone = '';
  password = '';
  getRegisterValues(val: any) {
    this.username = val.username;
    this.email = val.email;
    this.phone = val.phone;
    this.password = val.password;
  }

  ngOnInit(): void {}
}
