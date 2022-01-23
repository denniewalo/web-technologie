import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import jwtDecode from 'jwt-decode'
import { BehaviorSubject } from 'rxjs'
import { DecodedToken } from 'src/app/interfaces/DecodedToken'
import { LokalstorageService } from '../localstorageService/lokalstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token$ = new BehaviorSubject<DecodedToken | null>(null);

  constructor(private http: HttpClient, private localStorageService: LokalstorageService) {
    if (this.encodedToken) this.login(this.encodedToken)
  }

  get encodedToken(): string | null {
    return this.localStorageService.getToken()
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
    this.localStorageService.setToken(token)
    const decoded = jwtDecode<DecodedToken>(token)
    this.token$.next(decoded)
    return true
  }

  logout(): void {
    this.localStorageService.deleteUserId()
    this.localStorageService.deleteUsername()
    this.localStorageService.deleteRole()
    this.localStorageService.deleteToken()
    this.token$.next(null)
  }

  genHeader() {
    const headers = new HttpHeaders().set('Authorization','Bearer ' + this.localStorageService.getToken())
    return headers
  }
}
