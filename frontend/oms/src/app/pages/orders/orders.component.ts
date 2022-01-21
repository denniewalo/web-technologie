import { Component, OnInit } from '@angular/core';
import {Product} from "../../interfaces/Product";
import {CartService} from "../../services/cart.service";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  cart : Product[] = [];
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

}
