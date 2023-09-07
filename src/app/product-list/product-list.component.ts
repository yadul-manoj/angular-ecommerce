import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { IProductsList } from '../models/ecommerce.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  productsList!: IProductsList;

  constructor(private prodService: ProductService, public userService: UserService) {
    this.getProd();
  }

  ngOnInit() {
    
  }

  getProd() {
    this.prodService.getProducts().subscribe(
      success => {
        this.productsList = success
        console.log(this.productsList)
      },
      error => {
        console.error(error)
      }
    )
  }
}
