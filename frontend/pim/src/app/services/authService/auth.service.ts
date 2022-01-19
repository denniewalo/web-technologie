import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import jwtDecode from 'jwt-decode'
import { BehaviorSubject } from 'rxjs'
import { DecodedToken } from 'src/app/interfaces/DecodedToken'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token$ = new BehaviorSubject<DecodedToken | null>(null);

  get encodedToken(): string | null {
    return localStorage.getItem('TOKEN_KEY')
  }

  get token(): string | null {
    return localStorage.getItem('TOKEN_KEY')
  }

  constructor() {
    if (this.encodedToken) this.login(this.encodedToken)
  }

  get isExpired(): boolean {
    const date = new Date()
    const token = this.token$.getValue()
    if (!token) return true
    return token.exp < date.getTime()/1000
  }

  get isLoggedIn(): boolean {
    return this.token$.getValue() !== null
  }

  login(token: string): boolean {
    localStorage.setItem('TOKEN_KEY', token)
    const decoded = jwtDecode<DecodedToken>(token)
    this.token$.next(decoded)
    return true
  }

  logout(): void {
    localStorage.removeItem('TOKEN_KEY')
    this.deleteUserId()
    this.token$.next(null)
  }

  setToken(token: string) {
    localStorage.setItem('TOKEN_KEY', token)
    const decoded = jwtDecode<DecodedToken>(token)
    this.token$.next(decoded)
  }

  setUserId(userid: string) {
    localStorage.setItem('userid', userid)
  }

  getUserId() {
    return localStorage.getItem("userid")
  }

  deleteUserId() {
    localStorage.removeItem('userid')
  }
}
