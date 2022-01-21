import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from "./pages/products/products.component";
import {LoginComponent} from "./pages/login/login.component";
import {NewProductComponent} from "./pages/new-product/new-product.component";
import {EditProductComponent} from "./pages/edit-product/edit-product.component";
import { OrdersComponent } from './pages/orders/orders.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditStatusComponent} from './pages/edit-status/edit-status.component';


const routes: Routes = [
  //{ path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: 'products', component: ProductsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'create', component: NewProductComponent},
  { path: 'edit/:id', component: EditProductComponent},
  { path: 'update-status/:id', component: EditStatusComponent},
  { path: 'orders',component:OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
