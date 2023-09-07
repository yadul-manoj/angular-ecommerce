import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProductsList } from './models/ecommerce.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IProductsList>(this.baseUrl + 'products')
  }
}
