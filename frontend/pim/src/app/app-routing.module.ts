import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from "./pages/products/products.component";
import {LoginComponent} from "./pages/login/login.component";
import {LogoutComponent} from "./pages/logout/logout.component";
import {NewProductComponent} from "./pages/new-product/new-product.component";
import {EditProductComponent} from "./pages/edit-product/edit-product.component";


const routes: Routes = [
  //{ path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'create', component: NewProductComponent},
  { path: 'edit/:id', component: EditProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
