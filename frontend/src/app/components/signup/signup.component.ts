import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  // STEP-4
  constructor(public userService: UserService) {}

  showMessage: boolean = true;
  ngOnInit(): void {}

  // STEP-6
  // getting post request to the server with form details
  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      (res) => {
        window.alert('success');
      },
      (err) => {
        window.alert('failed');
        // resetForm(form);
      }
    );
  }
}
