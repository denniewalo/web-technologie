import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/Product';
import { AuthService } from './authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productURL: string = "http://localhost:4000/api/products"

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProduct(): Observable<{data: Product[], message: string, status: string}> {
    return this.http.get<{data: Product[], message: string, status: string}>(this.productURL, { headers: this.authService.genHeader()})
  };

}
