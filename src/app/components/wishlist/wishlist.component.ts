import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IProduct, IProductList, IUser, IWishlist } from 'src/app/models/ecommerce.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist!: IWishlist;
  currentUser!: IUser;

  constructor(public userService: UserService) {
    this.currentUser = this.userService.getUserDetails();
  }

  ngOnInit(): void {
    if (this.currentUser) {
      this.wishlist = this.userService.getUserWishlist(this.currentUser.id);
      console.log(this.wishlist);
    }
  }

  addToCart(product: IProduct) {
    this.userService.addToCart(this.currentUser.id, product);
  }

  deleteFromWishlist(productId: number) {
    this.userService.deleteFromWishlist(this.currentUser.id, productId);
    this.wishlist = this.userService.getUserWishlist(this.currentUser.id);
  }
}
