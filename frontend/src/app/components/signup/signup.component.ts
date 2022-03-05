import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  // STEP-4
  constructor(private router: Router) {}
  username = '';
  email = '';
  phone = '';
  password = '';

  showMessage: boolean = true;
  ngOnInit(): void {}

  // STEP-6
  // getting post request to the server with form details
  onSubmit(val: any) {
    this.username = val.username;
    this.email = val.email;
    this.phone = val.phone;
    this.password = val.password;

    axios
      .post('http://localhost:3000/api/register', {
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password,
      })
      .then((res) => {
        window.alert('successfully registerd');
        this.router.navigateByUrl('login');
      });
  }
}
