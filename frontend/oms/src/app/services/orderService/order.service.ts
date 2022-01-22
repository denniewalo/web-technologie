import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../../interfaces/Orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private ordersURL: string = "http://localhost:4000/api/orders"
  private ordersUpdateURL: string = "http://localhost:4000/api/orders/update-status"
  private getByIDURL: string = "http://localhost:4000/api/orders/getByID"
  private getByCustomerIDURL: string = "http://localhost:4000/api/orders/getByCustomerID/:customerId"
  constructor(private http: HttpClient) { }

  /**
   * 
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
   */

  createOrder(customerId: string, products: [], price: string,status: string): Observable<{message: string, data: Orders}>{
    console.log(products);
    const newOrder = {
      "ordersId": Date.now(),
      "customerId": customerId,
      "products": JSON.stringify(products),
      "price": price,
      "status": status
    }
    console.log("order created", newOrder);
    return this.http.post<{message: string, data: Orders}>(this.ordersURL, newOrder);
  };

  getOrder(): Observable<{data: Orders[], message: string, status: string}> {
    return this.http.get<{data: Orders[], message: string, status: string}>(this.ordersURL)
  };

  getOrderById(order_Id: string | undefined): Observable<{ message: string; data: Orders }> {
    return this.http.get<{message: string, data: Orders}>(this.getByIDURL + "/" + order_Id);
  }

  getOrderByCustomerId(customerId: string | undefined): Observable<{ message: string; data: Orders }> {
    return this.http.get<{message: string, data: Orders}>(this.getByCustomerIDURL + "/" + customerId);
  }

}
