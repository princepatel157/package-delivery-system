import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  username = '';
  email = '';
  phone = '';
  password = '';
  ngOnInit(): void {}

  onSubmit(val: any) {
    this.username = val.username;
    this.password = val.password;

    axios
      .post('http://localhost:3000/api/signin', {
        username: this.username,
        password: this.password,
      })
      .then((res) => {
        window.alert('Logged In');
        this.router.navigateByUrl('');
      });
  }
}
