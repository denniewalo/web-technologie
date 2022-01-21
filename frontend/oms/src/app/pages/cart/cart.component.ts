import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../interfaces/Product";
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart : Product[] = []
  constructor(private cartService: CartService,
              private router: Router,
              //private orderService: OrderService,
              //private authService: AuthService
              ) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  removeProduct(product: Product){
    this.cartService.removeProduct(product);
    this.cart = this.cartService.getCart();
  }

  getCartPrice(): String{
    return this.cartService.getCartPrice()
  }

  buy(){
    this.router.navigate(['/login']);
    }
   

/**
 *
     buy(){
    //check is user is logged in
    if(!this.authService.isLoggedIn()){
     this.router.navigate(['/login']);
   }

   else{
     this.orderService.createOrder(this.authService.getUserId(), this.cartService.getCart(), this.cartService.getCartPrice(),"In progess");
      this.cartService.clearCart();
    }
  }
 */
}
