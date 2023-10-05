import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ICart, IProduct, IUser, IWishlist } from '../models/ecommerce.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  isLoggedIn: boolean = false;
  currentUser: IUser | undefined;

  private dataSubject = new BehaviorSubject<IUser | null>(null);
  data$: Observable<IUser | null> = this.dataSubject.asObservable();

  updateData(user: IUser): void {
    this.dataSubject.next(user);
  }

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  loginUser(user: Object) {
    return this.http.post<IUser>(this.baseUrl + 'auth/login', user);
  }

  logoutUser() {
    this.isLoggedIn = false;
    this.currentUser = undefined;
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLoggedIn');
  }

  getUserDetails() {
    let user = sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  getUserCart(id: number) {
    return JSON.parse(sessionStorage.getItem(id + '_cart')!);
  }

  getCartQuantity(id: number) {
    let cart: ICart = JSON.parse(sessionStorage.getItem(id + '_cart')!);
    return cart.products.length;
  }

  createUserCart(id: number) {
    sessionStorage.setItem(id + '_cart', JSON.stringify({
      'userId': id,
      'products': [],
      'totalItems': 0,
      'total': 0
    }));
  }

  getUserCartStatus(id: number): boolean {
    if (sessionStorage.getItem(id + '_cart'))
      return true;
    else
      return false;
  }

  addToCart(id: number, product: IProduct) {
    let currentCart: ICart = JSON.parse(sessionStorage.getItem(id + '_cart')!);

    // Check if item exists in cart
    let index = currentCart.products.findIndex(prod => { return prod.product.id == product.id; });

    // Item exists
    if (index != -1) {
      console.log('existing item');
      // Set maximum purchasing limit
      if (currentCart.products[index].quantity < 2) {
        currentCart.products[index].quantity += 1;
        currentCart.products[index].total += product.price;
        currentCart.total += product.price;
        currentCart.totalItems += 1;
        this.toastr.success('Item added to cart successfully!', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
      } else {
        this.toastr.error('Cannot add item to cart.<br>Maximum quantity is two.', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
      }
    } else {
      console.log('new item');
      currentCart.products.push({ product: product, quantity: 1, total: product.price });
      currentCart.total += product.price;
      currentCart.totalItems += 1;
      this.toastr.success('Item added to cart successfully!', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
    }

    sessionStorage.setItem(id + '_cart', JSON.stringify(currentCart));
    console.log('current cart', sessionStorage.getItem(id + '_cart'));
  }

  deleteItemFromCart(userId: number, productId: number) {
    let currentCart: ICart = JSON.parse(sessionStorage.getItem(userId + '_cart')!);

    let index = currentCart.products.findIndex(prod => { return prod.product.id == productId; });

    if (index != -1) {
      currentCart.total -= currentCart.products[index].total;
      currentCart.totalItems -= currentCart.products[index].quantity;
      currentCart.products.splice(index, 1);
      this.toastr.success('Item removed from cart successfully!', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
    }

    sessionStorage.setItem(userId + '_cart', JSON.stringify(currentCart));
  }

  addItemQuantity(userId: number, product: IProduct) {
    let currentCart: ICart = JSON.parse(sessionStorage.getItem(userId + '_cart')!);

    let index = currentCart.products.findIndex(prod => { return prod.product.id == product.id; });

    if (index != -1) {
      if (currentCart.products[index].quantity < 2) {
        currentCart.products[index].quantity += 1;
        currentCart.products[index].total += product.price;
        currentCart.total += product.price;
        currentCart.totalItems += 1;
        this.toastr.success('Item quantity increased to ' + currentCart.products[index].quantity, '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
      } else {
        this.toastr.error('Cannot increase item quantity.<br>Maximum quantity is two.', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
      }
    }

    sessionStorage.setItem(userId + '_cart', JSON.stringify(currentCart));
  }

  removeItemQuantity(userId: number, product: IProduct) {
    let currentCart: ICart = JSON.parse(sessionStorage.getItem(userId + '_cart')!);

    let index = currentCart.products.findIndex(prod => { return prod.product.id == product.id; });

    if (index != -1) {
      currentCart.products[index].quantity -= 1;
      currentCart.products[index].total -= product.price;
      currentCart.total -= product.price;
      currentCart.totalItems -= 1;
      this.toastr.success('Item quantity decreased to ' + currentCart.products[index].quantity, '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
    }

    sessionStorage.setItem(userId + '_cart', JSON.stringify(currentCart));
  }

  createUserWishlist(id: number) {
    sessionStorage.setItem(id + '_wishlist', JSON.stringify({
      'userId': id,
      'products': [],
      'totalItems': 0,
    }));
  }

  getUserWishlistStatus(id: number): boolean {
    if (sessionStorage.getItem(id + '_wishlist'))
      return true;
    else
      return false;
  }

  getUserWishlist(id: number) {
    if (sessionStorage.getItem(id + '_wishlist'))
      return JSON.parse(sessionStorage.getItem(id + '_wishlist')!);
  }

  addToWishlist(id: number, product: IProduct) {
    if (this.getUserWishlistStatus(id)) {
      let currentWishlist: IWishlist = JSON.parse(sessionStorage.getItem(id + '_wishlist')!);

      let found = currentWishlist.products.find(prod => { return prod.id == product.id; });

      if (found) {
        this.toastr.error('Item already exists in wishlist.', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
      } else {
        currentWishlist.products.push(product);
        currentWishlist.totalItems += 1;
        this.toastr.success('Item added to wishlist successfully!', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
      }

      sessionStorage.setItem(id + '_wishlist', JSON.stringify(currentWishlist));
    }
  }

  deleteFromWishlist(userId: number, productId: number) {
    let currentWishlist: IWishlist = JSON.parse(sessionStorage.getItem(userId + '_wishlist')!);

    let index = currentWishlist.products.findIndex(prod => { return prod.id == productId; });

    if (index != -1) {
      currentWishlist.products.splice(index, 1);
      currentWishlist.totalItems -= 1;
      this.toastr.success('Item removed from wishlist.', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
    }

    sessionStorage.setItem(userId + '_wishlist', JSON.stringify(currentWishlist));
  }
}

