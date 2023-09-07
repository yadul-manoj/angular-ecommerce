import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IUser } from '../models/ecommerce.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  // Login form
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private toastr: ToastrService, public userService: UserService) {}

  ngOnInit() {
    console.log(this.userService.isLoggedIn)
  }


  login() {
    this.userService.loginUser(this.loginForm.value).subscribe(
      success => {
        console.log(success)
        sessionStorage.setItem('user', JSON.stringify(success))
        this.toastr.success('User login successful.</br>Welcome ' + success.firstName + '!', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true })
        this.userService.isLoggedIn = true
        this.userService.currentUser = success
        this.router.navigate([''])
      }, error => {
        console.error(error)
        this.toastr.error('User login failed.')
        this.userService.isLoggedIn = false
        this.userService.currentUser = undefined
      }
    )
  }

  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }
}
