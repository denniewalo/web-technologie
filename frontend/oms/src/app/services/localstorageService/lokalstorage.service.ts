import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LokalstorageService {

  constructor() { }

  // Setter
  setUserId(userid: string) {
    localStorage.setItem('USER_ID', userid)
  }

  setToken(token: string) {
    localStorage.setItem('TOKEN_KEY', token)
  }

  setRole(role: string) {
    localStorage.setItem('ROLE', role)
  }

  setUsername(username: string) {
    localStorage.setItem('USER_NAME', username)
  }

  setCart(cart: string) {
    localStorage.setItem('CART', cart)
  }


  // Getter
  getUserId() {
    return localStorage.getItem("USER_ID")
  }

  getToken() {
    return localStorage.getItem('TOKEN_KEY')
  }

  getRole() {
    return localStorage.getItem('ROLE')
  }

  getUsername() {
    return localStorage.getItem('USER_NAME')
  }

  getCart() {
    return localStorage.getItem('CART')
  }


  // Deleter
  deleteUserId() {
    localStorage.removeItem('USER_ID')
  }

  deleteToken() {
    localStorage.removeItem('TOKEN_KEY')
  }

  deleteRole() {
    localStorage.removeItem('ROLE')
  }
  
  deleteUsername() {
    localStorage.removeItem('USER_NAME')
  }
 
  deleteCart() {
    localStorage.removeItem('CART')
  }

}
