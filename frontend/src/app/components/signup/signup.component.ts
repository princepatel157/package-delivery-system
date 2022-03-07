import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private router: Router) {}
  username = '';
  email = '';
  phone = '';
  password = '';

  showMessage: boolean = true;
  ngOnInit(): void {}

  //  post request to the server with form details
  onSubmit(val: any) {
    this.username = val.username;
    this.email = val.email;
    this.phone = val.phone;
    this.password = val.password;
    if (this.username == '') {
      window.alert('all fields required');
    } else if (this.email == '') {
      window.alert('all fields required');
    } else if (this.phone == null) {
      window.alert('all fields required');
    } else if (this.password == '') {
      window.alert('all fields required');
    } else {
      axios
        .post('http://localhost:3000/api/register', {
          username: this.username,
          email: this.email,
          phone: this.phone,
          password: this.password,
        })
        .then((res) => {
          this.router.navigateByUrl('verify');
        })
        .catch((err) => {
          window.alert('user Exist');
        });
    }
  }
}
