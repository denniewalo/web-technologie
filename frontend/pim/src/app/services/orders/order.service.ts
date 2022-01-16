import { Injectable } from '@angular/core';
import { Orders } from '../../interfaces/Orders';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersURL: string = "http://localhost:4000/api/orders"

  constructor(private http: HttpClient) { }

  createOrder(ordersId: string, customerId: string, products: string, price: string,status: string): Observable<{message: string, data: Orders}>{
    const newOrder = {
      "ordersid": ordersId,
      "customerId": customerId,
      "products": products,
      "price": price,
      "status": status
    }
    return this.http.post<{message: string, data: Orders}>(this.ordersURL, newOrder);
  }
}
