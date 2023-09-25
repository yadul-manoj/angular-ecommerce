import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { IProduct, IProductList, IUser } from '../models/ecommerce.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  isLoggedIn!: boolean;
  currentProduct!: IProduct;
  currentUser!: IUser;
  productList!: IProductList;
  productCategory!: string;
  productCategories!: string[];
  sortBy: string | undefined = undefined;
  sortPending: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private prodService: ProductService, public userService: UserService) {
    if (sessionStorage.getItem('isLoggedIn') && sessionStorage.getItem('user')) {
      this.currentUser = JSON.parse(sessionStorage.getItem('user')!);
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.getCategories();

    this.route.params.subscribe(params => {
      this.productCategory = params['id'];
      console.log('params', params['id']);
      if (!(this.productCategory == undefined)) {
        this.getProdByCateogory(this.productCategory);
      } else {
        this.getProd();
      }
    });

    // Listen to change in sort crtieria 
    this.route.queryParams.subscribe(params => {
      this.sortBy = params['sort'];
      console.log('queryparams', this.sortBy);

      if (this.productList) {
        this.sortProductList();
      } else {
        this.sortPending = true;
      }
    });
  }

  getProd() {
    this.prodService.getProducts().subscribe(
      success => {
        this.productList = success;

        // Check if sorting is pending and apply it if necessary
        if (this.sortPending) {
          this.sortPending = false;
          this.sortProductList();
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  getCategories() {
    this.prodService.getCategories().subscribe(
      success => {
        this.productCategories = success;
        // console.log(this.productCategories);

        // Check if sorting is pending and apply it if necessary
        if (this.sortPending) {
          this.sortPending = false;
          this.sortProductList();
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  getProdByCateogory(id: string) {
    this.prodService.getProductsFromCategory(id).subscribe(
      success => {
        this.productList = success;
      },
      error => {
        console.error(error);
      }
    )
  }

  addToCart(product: IProduct) {
    this.userService.addToCart(this.currentUser.id, product);
  }

  sortProductList() {
    if (this.sortBy == 'priceasc')
      this.sortByPriceAsc();
    if (this.sortBy == 'pricedesc')
      this.sortByPriceDesc();
    if (this.sortBy == 'rating')
      this.sortByRatingDesc();
  }

  sortByPriceAsc() {
    this.productList.products.sort((a: IProduct, b: IProduct) => a.price - b.price);
  }

  sortByPriceDesc() {
    this.productList.products.sort((a: IProduct, b: IProduct) => b.price - a.price);
  }

  sortByRatingDesc() {
    this.productList.products.sort((a: IProduct, b: IProduct) => b.rating - a.rating);
  }

  routeToCategory(category: string) {
    this.router.navigateByUrl('products/category/' + category);
    // window.location.reload();
  }

  sendProd(product: IProduct) {
    this.prodService.sendProductDetails(product);
  }
}
