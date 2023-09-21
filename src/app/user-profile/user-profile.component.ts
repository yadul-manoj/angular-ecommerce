import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../models/ecommerce.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser!: IUser;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getUserDetails()
    if (!this.currentUser) {
      this.router.navigate(['login'])
    }
  }
}
