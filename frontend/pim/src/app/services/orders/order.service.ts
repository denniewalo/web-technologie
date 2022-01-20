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

  createOrder(ordersId: string, customerId: string, products: [], price: string,status: string): Observable<{message: string, data: Orders}>{
    const newOrder = {
      "ordersId": Date.now(),
      "customerId": customerId,
      "products": JSON.stringify(products),
      "price": price,
      "status": status
    }
    return this.http.post<{message: string, data: Orders}>(this.ordersURL, newOrder);
  };

  getOrder(): Observable<{data: Orders[], message: string, status: string}> {
    return this.http.get<{data: Orders[], message: string, status: string}>(this.ordersURL)
  };
}
