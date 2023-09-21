import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct, IUser } from '../models/ecommerce.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  isLoggedIn!: boolean;
  currentUser!: IUser;
  product!: IProduct;
  productId!: string;
  productQty: number = 1;

  constructor(private userService: UserService, private route: ActivatedRoute, private prodService: ProductService, private toastr: ToastrService) {
    if (sessionStorage.getItem('isLoggedIn') && sessionStorage.getItem('user')) {
      this.currentUser = JSON.parse(sessionStorage.getItem('user')!);
      this.isLoggedIn = true;
    }

    this.route.params.subscribe(params => {
      this.productId = params['id'];
      console.log(params);
    });
  }

  // cleanup below code

  ngOnInit() {
    this.getProductFromProdList();
    // if (!this.product) {
    this.prodService.getSingleProduct(this.productId).subscribe(
      success => {
        this.product = success;
      },
      error => {
        console.error(error);
      }
    )
    // }
  }

  switchImages(img: string, index: number) {
    let temp: string = this.product.images[0];
    this.product.images[0] = img;
    this.product.images[index] = temp;
  }

  addQuantity() {
    if (this.productQty == 2)
      this.toastr.error('Cannot increase item quantity.<br>Maximum quantity is two.', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
    else
      this.productQty += 1;
  }

  removeQuantity() {
    this.productQty -= 1;
  }

  getProductFromProdList() {
    this.prodService.productSubject.subscribe(
      product => {
        console.log('ok2', product);
        this.product = product;
      },
      error => {
        console.error(error)
      }
    )
  }

  addToCart(product: IProduct) {
    for (let i = 0; i < this.productQty; i++) {
      this.userService.addToCart(this.currentUser.id, product);
    }
  }
}



