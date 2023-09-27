import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { IProduct, IProductList, IUser } from '../models/ecommerce.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  isLoggedIn!: boolean;
  currentProduct!: IProduct;
  currentUser!: IUser;
  productList!: IProductList;
  productListCopy!: IProductList;
  productCategory!: string;
  productCategories!: string[];
  sortBy: string = '';
  sortPending: boolean = true;
  searchString: string = '';
  noProductsFound: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private prodService: ProductService, public userService: UserService) {
    if (sessionStorage.getItem('isLoggedIn') && sessionStorage.getItem('user')) {
      this.currentUser = JSON.parse(sessionStorage.getItem('user')!);
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.getCategories();

    this.route.params.subscribe(params => {
      this.productCategory = params['id'];

      if (!(this.productCategory == undefined)) {
        this.getProdByCateogory(this.productCategory);
      } else {
        this.getProd();
      }
    });

    // Listen to change in sort crtieria 
    this.route.queryParams.subscribe(params => {
      this.sortBy = params['sort'];
      this.searchString = params['search'];
      console.log('qp', this.sortBy, this.searchString);

      // Added extra if for this.productList as products[] become undefined when searchProducts() is called. Can fix with delay or call again in getProd()
      // setTimeout(() => {
      if (this.searchString != undefined && this.productList) {
        this.productList = structuredClone(this.productListCopy);
        this.noProductsFound = false;
        this.searchProducts();
      }
      // }, 1000);

      if (this.productList && this.sortBy != undefined) {
        this.sortProductList();
      } else {
        this.sortPending = true;
      }
    });
  }

  getProd() {
    this.prodService.getProducts().subscribe(
      success => {
        this.productList = success;
        this.productListCopy = structuredClone(this.productList);

        // Check if sorting is pending and apply it if necessary
        if (this.sortPending) {
          this.sortPending = false;
          this.sortProductList();
        }

        if (this.searchString != undefined)
          this.searchProducts();
        else {
          this.productList = structuredClone(this.productListCopy);
          this.noProductsFound = false;
        }
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
        // console.log(this.productCategories);
      },
      error => {
        console.error(error);
      }
    )
  }

  getProdByCateogory(id: string) {
    this.prodService.getProductsFromCategory(id).subscribe(
      success => {
        this.productList = success;

        // Check if sorting is pending and apply it if necessary
        if (this.sortPending) {
          this.sortPending = false;
          this.sortProductList();
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  addToCart(product: IProduct) {
    this.userService.addToCart(this.currentUser.id, product);
  }

  sortProductList() {
    if (this.sortBy == 'priceasc')
      this.sortByPriceAsc();
    if (this.sortBy == 'pricedesc')
      this.sortByPriceDesc();
    if (this.sortBy == 'rating')
      this.sortByRatingDesc();
  }

  sortByPriceAsc() {
    this.productList.products.sort((a: IProduct, b: IProduct) => a.price - b.price);
  }

  sortByPriceDesc() {
    this.productList.products.sort((a: IProduct, b: IProduct) => b.price - a.price);
  }

  sortByRatingDesc() {
    this.productList.products.sort((a: IProduct, b: IProduct) => b.rating - a.rating);
  }

  routeToCategory(category: string) {
    this.router.navigateByUrl('products/category/' + category);
    // window.location.reload();
  }

  sendProd(product: IProduct) {
    this.prodService.sendProductDetails(product);
  }

  sortNavigation() {
    console.log(this.router.createUrlTree([this.router.url], { queryParams: { sort: this.sortBy } }).toString());
    console.log(this.router.url)

    this.router.navigate(
      [],
      {
        queryParams: { sort: this.sortBy, search: this.searchString },
        queryParamsHandling: 'merge'
      }
    );
  }

  searchProducts() {
    let products: IProduct[] = [];

    products = this.productList.products.filter(product => {
      return product.title.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase());
    });

    if (products.length == 0) {
       this.noProductsFound = true;
    }
     
    this.productList.products = products;
  }
}
