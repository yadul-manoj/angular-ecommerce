import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct, IProductList } from '../models/ecommerce.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  categoryId!: string;
  productList! : IProductList;

  constructor(private route: ActivatedRoute, private prodService: ProductService) {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      this.getProductsFromCategory();
      console.log(params);
    });
  }
  
  ngOnInit() {
    this.getProductsFromCategory();
  }

  getProductsFromCategory() {
    this.prodService.getProductsFromCategory(this.categoryId).subscribe(
      success => {
        this.productList = success;
        console.log(this.productList);
      },
      error => {
        console.error(error);
      }
    )
  }

  sendProd(product: IProduct) {
    
  }
}
