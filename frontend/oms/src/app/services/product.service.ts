import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productURL: string = "http://localhost:4000/api/products"

  constructor(private http: HttpClient) { }

  getProduct(): Observable<{data: Product[], message: string, status: string}> {
    return this.http.get<{data: Product[], message: string, status: string}>(this.productURL)
  };
  
}
