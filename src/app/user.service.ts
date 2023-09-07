import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { IUser } from './models/ecommerce.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl
  isLoggedIn: boolean = false
  currentUser: IUser | undefined;

  constructor(private http: HttpClient) { }

  loginUser(user: Object) {
    return this.http.post<IUser>(this.baseUrl + 'auth/login', user);
  }

  logoutUser() {
    this.isLoggedIn = false
    this.currentUser = undefined
    sessionStorage.removeItem('user')
  }
}
