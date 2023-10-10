import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path: 'home', component: HomePageComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/category/:id', component: ProductListComponent },
  { path: 'products/:id', component: ProductPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartPageComponent, canActivate: [authGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
