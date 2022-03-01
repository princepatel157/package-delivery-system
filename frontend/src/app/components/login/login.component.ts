import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  model = {
    username: '',
    password: '',
  };
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      (res) => {
        // this.userService.setToken(res['token']);
      },
      (err) => {}
    );
  }
}
