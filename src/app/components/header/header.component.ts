import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct, IProductList, IUser } from '../../models/ecommerce.model';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  productCategory: string = '';
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

    this.route.queryParams.subscribe(params => {
      this.searchString = params['search'];
    });

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        let curUrlTree = this.router.parseUrl(this.router.url).toString().split(/[/?]+/);

        // console.info(curUrlTree);

        if (curUrlTree[1] != 'products')
          this.productCategory = '';
        else
          // Category is always at the third index 
          this.productCategory = curUrlTree[3];
      }
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
