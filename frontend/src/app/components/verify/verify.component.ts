import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  constructor(private router: Router) {}
  phone = null;
  token: number = 0;
  verify: boolean = false;

  ngOnInit(): void {}

  sendBtn(val: any) {
    this.phone = val;
    this.token = Math.floor(Math.random() * 10000);
    // console.log(this.token);
    // console.log(this.phone);

    axios.get('http://localhost:3000/api/sms', {
      params: {
        phone: this.phone,
        otp: this.token,
      },
    });
  }

  submitOtp(val: any) {
    if (val == this.token) {
      window.alert('otp verified');
      window.alert('Registered Successfully');
      this.router.navigateByUrl('login');
    } else {
      window.alert('wrong otp');
    }
  }
}
