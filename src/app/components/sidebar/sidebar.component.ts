import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  productCategory: string = '';
  productCategories!: string[];

  constructor(private prodService: ProductService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();

    // Subscribing for params using activated route doesnt work because router outlet is outside the component (but works for queryparams)
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        let curUrlTree = this.router.parseUrl(this.router.url).toString().split(/[/?]+/);

        // console.info(curUrlTree);

        if (curUrlTree[1] != 'products')
          this.productCategory = '';
        else
          // Category is always at the third index 
          this.productCategory = curUrlTree[3];
      }
    });

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

  routeToCategory(category: string) {
    this.router.navigateByUrl('products/category/' + category);
    this.productCategory = category;
  }

  routeToProducts() {
    this.router.navigate(['products']);
    this.productCategory = '';
  }
}
