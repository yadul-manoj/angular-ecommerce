import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../models/ecommerce.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  productCategories!: string[];
  currentUser!: IUser | null;

  constructor(private prodService: ProductService, private toastr: ToastrService, private router: Router, public userService: UserService) {
    // this.currentUser = this.userService.getUserDetails();
  }

  ngOnInit() {
    this.getCategories();

    this.userService.data$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.userService.logoutUser();
    this.router.navigate(['']);
    this.toastr.success('Logged out successfully.', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
  }

  getCategories() {
    this.prodService.getCategories().subscribe(
      success => {
        this.productCategories = success;
        // console.log(this.productCategories);
      },
      error => {
        console.error(error);
      }
    )
  }
}
