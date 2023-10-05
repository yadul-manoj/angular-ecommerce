import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ICategoryProducts, IProduct, IProductList } from '../../models/ecommerce.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  productList!: IProductList;
  categoryProducts: ICategoryProducts[] = [];

  constructor(private spinner: NgxSpinnerService,private prodService: ProductService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.getProd();

      this.spinner.hide();
    }, 1000);
  }

  routeToCategory(category: string) {
    this.router.navigateByUrl('products/category/' + category);
    // window.location.reload();
  }

  getProd() {
    this.prodService.getProducts().subscribe(
      success => {
        this.productList = success;
        this.groupProductsByCategory();
      },
      error => {
        console.error(error);
      }
    )
  }

  groupProductsByCategory() {
    this.productList.products.forEach((product) => {
      const existingCategoryProduct = this.categoryProducts.find(
        (categoryProduct) => categoryProduct.category === product.category
      );

      if (existingCategoryProduct) {
        existingCategoryProduct.productList!.products.push(product);
        existingCategoryProduct.productList!.total += 1;
        existingCategoryProduct.productList!.limit += 1;
      } else {
        const CategoryProduct: ICategoryProducts = {
          category: product.category,
          productList: {
            products: [product],
            total: 1,
            skip: 0,
            limit: 1,
          },
        };
        this.categoryProducts.push(CategoryProduct);
      }
    });
  }
}
