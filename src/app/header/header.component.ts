import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, public userService: UserService) {}

  ngOnInit() {

  }

  logout() {
    this.userService.logoutUser()
    this.router.navigate([''])
  }

  status() {
    console.log(this.userService.isLoggedIn)
  }
}
