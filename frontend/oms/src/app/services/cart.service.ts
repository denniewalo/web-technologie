import { Injectable } from '@angular/core';
import {Product} from "../interfaces/Product";
import { LokalstorageService } from './localstorageService/lokalstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private lokalstorageService: LokalstorageService) { }

  getCart(){
    if(this.lokalstorageService.getCart()!= null){
      // @ts-ignore
      return JSON.parse(this.lokalstorageService.getCart());
    }
    return [];
  }

  addToCart(product: Product) {
    if(this.lokalstorageService.getCart() != null){
      // @ts-ignore
      let cart = JSON.parse(this.lokalstorageService.getCart());
      // @ts-ignore
      cart.push(product);
      const data = JSON.stringify(cart);
      this.lokalstorageService.setCart(data);
    }else {
      let cart : Product[] = []
      cart.push(product);
      const data = JSON.stringify(cart);
      this.lokalstorageService.setCart(data);
    }
  }

  
  getCartPrice(){
    // @ts-ignore
    let cart : Product[]= JSON.parse(this.lokalstorageService.getCart());
    let sum: number = 0;

    if(cart == null){
      sum = 0;
    }
    else{
      for( let i = 0; i < cart.length; i++){
        sum += Number(cart[i].price);
      }
    }

    return sum.toString();
  }

  clearCart() {
    this.lokalstorageService.deleteCart();
  }

  removeProduct(product: Product) {
    // @ts-ignore
    let cart : Product[]= JSON.parse(this.lokalstorageService.getCart());
    let tempCart: Product[] = [];
    let isRemoved: boolean = false;
    const deleteIndex = cart.findIndex(item => {
      console.log(product.id)
      item.id == product.id
    })
    console.log(deleteIndex);
    cart.splice(deleteIndex, 1);
    const data = JSON.stringify(cart);
    this.lokalstorageService.setCart(data);
  }

  buy(){
    
  }
}
