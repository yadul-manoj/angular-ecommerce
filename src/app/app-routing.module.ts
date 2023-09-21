import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/category/:id', component: ProductListComponent },
  { path: 'products/:id', component: ProductPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'category/:id', component: CategoryPageComponent },
  // { path: '404', component: NotFoundComponent },
  // { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
