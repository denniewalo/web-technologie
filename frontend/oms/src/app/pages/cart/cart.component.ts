import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../interfaces/Product";
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/orderService/order.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart : Product[] = []
  constructor(private cartService: CartService,
              private router: Router,
              private orderService: OrderService,
              private authService: AuthService,
              private toastr: ToastrService
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
    //check is user is logged in
    if(!this.authService.isLoggedIn){
     this.router.navigate(['/login']);
   }

   else{console.log(this.cartService.getCartPrice());
    if(Number(this.cartService.getCartPrice()) != 0){
      console.log(Number(this.cartService.getCartPrice))
      // @ts-ignore
    this.orderService.createOrder(this.authService.getUserId(), this.cartService.getCart(), this.cartService.getCartPrice(),"In progess").subscribe((res) => {
     console.log("hallo",res);
    })
    
    console.log(this.authService.getUserId());
    console.log(this.cartService.getCart());
    console.log(this.cartService.getCartPrice());
    this.toaster();
    window.location.reload();
    this.cartService.clearCart();
    }
    
     
    }
  }

  toaster() {
    this.toastr.success("Your order has been received!", "");
  }
   
}
