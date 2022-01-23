import { Injectable } from '@angular/core';
import {Product} from "../interfaces/Product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getCart(){
    if(localStorage.getItem('cart')!= null){
      // @ts-ignore
      return JSON.parse(localStorage.getItem('cart'));
    }
    return [];
  }

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

  
  getCartPrice(){
    // @ts-ignore
    let cart : Product[]= JSON.parse(localStorage.getItem('cart'));
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
    localStorage.removeItem('cart');
  }

  removeProduct(product: Product) {
    // @ts-ignore
    let cart : Product[]= JSON.parse(localStorage.getItem('cart'));
    let tempCart: Product[] = [];
    let isRemoved: boolean = false;
    /**
     * const deleteIndex = cart.findIndex(item => {
      console.log(product.id)
      item.id == product.id
    })
     */
    let deleteIndex = 0;
    for(let i = 0; i < cart.length; i++){
      if(cart[i].id == product.id){
        deleteIndex = i;
      }
    }
    console.log("deleteIndex:", deleteIndex);
    cart.splice(deleteIndex, 1);
    const data = JSON.stringify(cart);
    localStorage.setItem('cart', data);
  }

  buy(){
    
  }
}
