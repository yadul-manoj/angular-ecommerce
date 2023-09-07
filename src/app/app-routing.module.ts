import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverPageComponent } from './cover-page/cover-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  // { path: '', component: CoverPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: UserProfileComponent
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
