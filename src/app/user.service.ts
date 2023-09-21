import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ICart, IProduct, IUser } from './models/ecommerce.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  isLoggedIn: boolean = false;
  currentUser: IUser | undefined;

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
    // return this.http.get<ICart>(this.baseUrl + 'carts/user/' + id);

    return JSON.parse(sessionStorage.getItem(id + '_cart')!);
  }

  getCartQuantity(id: number) {
    let cart: ICart = JSON.parse(sessionStorage.getItem(id + '_cart')!);
    return cart.totalItems;
  }

  createUserCart(id: number) {
    // localStorage.setItem(id + '_cart', JSON.stringify({
    //   'userId': id,
    //   'products': [],
    //   'totalItems': 0,
    //   'total': 0
    // }));

    sessionStorage.setItem(id + '_cart', JSON.stringify({
      'userId': id,
      'products': [],
      'totalItems': 0,
      'total': 0
    }));
  }

  getUserCartStatus(id: number): boolean {
    // if (localStorage.getItem(id + '_cart'))
    //   return true;
    // else
    //   return false;

    if (sessionStorage.getItem(id + '_cart'))
      return true;
    else
      return false;
  }

  addToCart(id: number, product: IProduct) {
    //   let currentCart: ICarts = JSON.parse(localStorage.getItem(id + '_cart')!);
    //   console.log('current cart', currentCart);

    //   // Check if itme exists in cart
    //   let index = currentCart.products.findIndex(prod => { prod.product.id == product.id; })
    //   // Item exists
    //   if (index != -1) {
    //     console.log('existing item');
    //     // Set maximum purchasing limit
    //     if (currentCart.products[index].quantity < 2) {
    //       currentCart.products[index].quantity += 1;
    //       currentCart.products[index].total += product.price;
    //       this.toastr.success('Item added to cart successfully!', '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
    //     } else {
    //       this.toastr.error('Cannot add item to cart.<br>Maximum quantity is two.',  '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
    //     } 
    //   } else {
    //     console.log('new item');
    //     currentCart.products.push({ product: product, quantity: 1, total: product.price });
    //   }

    //   localStorage.setItem(id + '_cart', JSON.stringify(currentCart));
    //   console.log('current cart', localStorage.getItem(id + '_cart'));
    // }


    let currentCart: ICart = JSON.parse(sessionStorage.getItem(id + '_cart')!);
    console.log('current cart', currentCart);
    console.log('prod id', product.id);

    // Check if item exists in cart
    // let index = currentCart.products.findIndex(prod => { prod.product.id == product.id; console.log(prod.product.id, product.id);});
    let index = -1;

    for (let i = 0; i < currentCart.products.length; i++) {
      if (currentCart.products[i].product.id == product.id) {
        index = i;
        break;
      }
    }

    console.log('index', index);
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

    let index = -1;

    for (let i = 0; i < currentCart.products.length; i++) {
      if (currentCart.products[i].product.id == productId) {
        index = i;
        break;
      }
    }

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

    let index = -1;

    for (let i = 0; i < currentCart.products.length; i++) {
      if (currentCart.products[i].product.id == product.id) {
        index = i;
        break;
      }
    }

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

    let index = -1;

    for (let i = 0; i < currentCart.products.length; i++) {
      if (currentCart.products[i].product.id == product.id) {
        index = i;
        break;
      }
    }

    if (index != -1) {
        currentCart.products[index].quantity -= 1;
        currentCart.products[index].total -= product.price;
        currentCart.total -= product.price;
        currentCart.totalItems -= 1;
        this.toastr.success('Item quantity decreased to ' + currentCart.products[index].quantity, '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
    }

    sessionStorage.setItem(userId + '_cart', JSON.stringify(currentCart));
  }
}

