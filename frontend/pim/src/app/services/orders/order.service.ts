import { Injectable } from '@angular/core';
import { Orders } from '../../interfaces/Orders';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersURL: string = "http://localhost:4000/api/orders"
  private ordersUpdateURL: string = "http://localhost:4000/api/orders/update-status"
  private getByIDURL: string = "http://localhost:4000/api/orders/getByID"
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

  getOrderById(order_Id: string | undefined): Observable<{ message: string; data: Orders }> {
    return this.http.get<{message: string, data: Orders}>(this.getByIDURL + "/" + order_Id);
  }
  updateStatus(orders_Id: string, status:string): Observable<{message: string, data: Orders}>{
    console.log(orders_Id);
    const updateStatus = {
      "status": status,
      "orders_Id": orders_Id
    }
    return this.http.patch<{message: string, data: Orders}>(this.ordersUpdateURL, updateStatus);
  }
}
