import { Injectable } from '@angular/core';
import {Product} from "../interfaces/Product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(product: Product) {
    if(localStorage.getItem('cart') != null){
      // @ts-ignore
      let cart = JSON.parse(localStorage.getItem('cart'));
      // @ts-ignore
      cart.push(product);
      const data = JSON.stringify(cart);
      localStorage.setItem('cart', data);
    }else {
      let cart : Product[] = []
      cart.push(product);
      const data = JSON.stringify(cart);
      localStorage.setItem('cart', data);
    }
  }

  clearCart() {
    localStorage.removeItem('cart');
  }

}
