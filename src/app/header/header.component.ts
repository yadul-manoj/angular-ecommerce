import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private toastr: ToastrService, private router: Router, public userService: UserService) {}

  ngOnInit() {

  }

  logout() {
    this.userService.logoutUser()
    this.router.navigate([''])
    this.toastr.success('Logged out successfully.', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true })
  }

  status() {
    console.log(this.userService.isLoggedIn)
  }
}
