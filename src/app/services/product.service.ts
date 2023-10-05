import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProduct, IProductList } from '../models/ecommerce.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.baseUrl;
  public productSubject = new BehaviorSubject<IProduct | any>(null);

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<string[]>(this.baseUrl + 'products/categories')
  }

  getSingleProduct(id: string) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }


  getProducts() {
      return this.http.get<IProductList>(this.baseUrl + 'products?limit=0&skip=0');
  }

  getProductsFromCategory(id: string) {
    return this.http.get<IProductList>(this.baseUrl + 'product/category/' + id);
  }

  sendProductDetails(product: IProduct) {
    this.productSubject.next(product);
    // console.log('2', product);
  }
}
