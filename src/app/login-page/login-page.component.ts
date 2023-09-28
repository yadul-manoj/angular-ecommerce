import { Component, OnInit, createNgModule } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators, FormBuilder } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ICart, IUser } from '../models/ecommerce.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  currentUser!: IUser;
  userCarts!: ICart; 
  // Login form
  loginForm = this.formbuilder.group({
    username: ['kminchelle', [Validators.required]],
    password: ['0lelplR', [Validators.required]]
  });

  constructor(private formbuilder: FormBuilder, private router: Router, private toastr: ToastrService, public userService: UserService) {
    this.currentUser = userService.getUserDetails();
    
    if (this.currentUser) {
      this.router.navigate(['home'])
    }
  }

  ngOnInit() {
    this.userService.updateData(this.userService.getUserDetails());
   
  }


  login() {
    this.userService.loginUser(this.loginForm.value).subscribe(
      success => {
        sessionStorage.setItem('user', JSON.stringify(success));
        this.toastr.success('User login successful.</br>Welcome ' + success.firstName + '!', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
        this.userService.isLoggedIn = true
        sessionStorage.setItem('isLoggedIn', "true");
        this.userService.currentUser = success;
        this.router.navigate(['home']);
        
        this.currentUser = success;

        if (this.userService.getUserCartStatus(this.currentUser.id)) {
          // console.log('exists');
        } else {
          this.userService.createUserCart(this.currentUser.id);
        }

        this.userService.updateData(success);
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
