import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ICategoryProducts, IProductList } from '../models/ecommerce.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  productList!: IProductList;
  productCategories!: string[];
  categoryProducts: ICategoryProducts[] = [];

  constructor(private prodService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getCategories();

    setTimeout(() => {
      for (const category of this.productCategories) {
        this.getProductsByCategory(category);
      }
    }, 1500);


    console.log(this.categoryProducts);

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
      },
      error => {
        console.error(error);
      }
    )
  }

  getProductsByCategory(category: string) {
    let tempCategoryProducts: ICategoryProducts = {
      category: category,
      productsList: null
    };

    this.prodService.getProductsFromCategory(category).subscribe(
      success => {
        tempCategoryProducts.productsList = success;
      },
      error => {
        console.error(error);
      }
    )

    this.categoryProducts.push(tempCategoryProducts);
  }


  routeToCategory(category: string) {
    this.router.navigateByUrl('products/category/' + category);
    // window.location.reload();
  }
}
