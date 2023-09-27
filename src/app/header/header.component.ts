import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct, IProductList, IUser } from '../models/ecommerce.model';
import { ProductService } from '../product.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  productList!: IProductList;
  productCategories!: string[];
  currentUser!: IUser | null;
  searchString: string = '';
  search: string = '';

  searchForm = this.formbuilder.group({
    search: ['', [Validators.required]],
  });

  constructor(private route: ActivatedRoute, private formbuilder: FormBuilder, private prodService: ProductService, private toastr: ToastrService, public router: Router, public userService: UserService) {
    // this.currentUser = this.userService.getUserDetails();
  }

  ngOnInit() {
    this.getCategories();

    this.userService.updateData(this.userService.getUserDetails());

    this.userService.data$.subscribe(user => {
      this.currentUser = user;
    });

    this.prodService.getProducts().subscribe(
      success => {
        this.productList = success;
      },
      error => {
        console.error(error);
      }
    )

    this.route.queryParams.subscribe(params => {
      this.searchString = params['search'];
      // console.log('queryparams', this.search);
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
      },
      error => {
        console.error(error);
      }
    )
  }

  // searchProducts() {
  //   console.log(this.searchString);
  //   let products: IProduct[] = [];

  //   products = this.productList.products.filter(product => {
  //     return product.title.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase());
  //   });

  //   console.log(products);
  // }

  searchNavigation() {
    if (this.searchString != '') {
      this.router.navigate(
        ['/products'],
        {
          queryParams: { search: this.searchString },
          queryParamsHandling: 'merge'
        }
      );
    }
  }
}
