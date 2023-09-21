import { Component } from '@angular/core';
import { IUser, ICart, IProduct } from '../models/ecommerce.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  currentUser!: IUser;
  cartItems!: ICart;

  constructor(public userService: UserService) {
    this.currentUser = this.userService.getUserDetails();
  }

  ngOnInit() {
    if (this.currentUser) {
      this.cartItems = this.userService.getUserCart(this.currentUser.id);
    }
  }

  deleteItem(productId: number) {
    this.userService.deleteItemFromCart(this.currentUser.id, productId);
    this.cartItems = this.userService.getUserCart(this.currentUser.id);
  }

  addQuantity(product: IProduct) {
    this.userService.addItemQuantity(this.currentUser.id, product);
    this.cartItems = this.userService.getUserCart(this.currentUser.id);
  }

  removeQuantity(product: IProduct) {
    this.userService.removeItemQuantity(this.currentUser.id, product);
    this.cartItems = this.userService.getUserCart(this.currentUser.id);
  }
}
