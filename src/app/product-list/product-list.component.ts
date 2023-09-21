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

  constructor(private router: Router, private route: ActivatedRoute, private prodService: ProductService, public userService: UserService) {
    if (sessionStorage.getItem('isLoggedIn') && sessionStorage.getItem('user')) {
      this.currentUser = JSON.parse(sessionStorage.getItem('user')!);
      this.isLoggedIn = true;
    }
    // this.getProd();
    this.route.params.subscribe(params => {
      this.productCategory = params['id'];
      console.log(params['id']);
      if (!(this.productCategory == undefined)) {
        this.getProdByCateogory(this.productCategory);
      } else {
        this.getProd(); 
      }
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getProd() {
    this.prodService.getProducts().subscribe(
      success => {
        this.productList = success;
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

  routeToCategory(category: string) {
    this.router.navigateByUrl('products/category/' + category);
    // window.location.reload();
  }

  sendProd(product: IProduct) {
    this.prodService.sendProductDetails(product);
  }
}
