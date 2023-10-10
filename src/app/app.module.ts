import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LayoutComponent } from './layout/layout.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    ProductListComponent,
    UserProfileComponent,
    NotFoundComponent,
    ProductPageComponent,
    CartPageComponent,
    SidebarComponent,
    SearchPipePipe,
    HomePageComponent,
    LayoutComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    // ToastrModule.forRoot(), // ToastrModule added
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
