import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // STEP-3
  selectedUser: User = {
    username: '',
    email: '',
    phone: '',
    password: '',
  };

  // STEP-7
  constructor(private http: HttpClient) {}

  // post function
  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }
}
