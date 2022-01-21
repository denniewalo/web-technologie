import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../interfaces/Product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart : Product[] = []
  constructor(private cartService: CartService,
              //private orderService: OrderService
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

  /**
   * buy(){
   * //if not logged in -> route login
   * //else
   * this.orderService.createOrder()
   * }
   */
}
