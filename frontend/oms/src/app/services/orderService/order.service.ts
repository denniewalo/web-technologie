import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from 'src/app/interfaces/Orders';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private ordersURL: string = "http://localhost:4000/api/orders"
  private ordersUpdateURL: string = "http://localhost:4000/api/orders/update-status"
  private getByIDURL: string = "http://localhost:4000/api/orders/getByID"
  private getByCustomerIDURL: string = "http://localhost:4000/api/orders/getByCustomerID/:customerId"

  constructor(private http: HttpClient, private authService: AuthService) { }


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
    return this.http.post<{message: string, data: Orders}>(this.ordersURL, newOrder, { headers: this.getAccessToken() });
  };
   */

  createOrder(customerId: string, products: [], price: string,status: string): Observable<{message: string, data: Orders}>{
    const newOrder = {
      "ordersId": Date.now(),
      "customerId": customerId,
      "products": JSON.stringify(products),
      "price": price,
      "status": status
    }
    return this.http.post<{message: string, data: Orders}>(this.ordersURL, newOrder, { headers: this.authService.genHeader()});
  };

  getOrder(): Observable<{data: Orders[], message: string, status: string}> {
    return this.http.get<{data: Orders[], message: string, status: string}>(this.ordersURL, { headers: this.authService.genHeader()})
  };

  getOrderById(order_Id: string | undefined): Observable<{ message: string; data: Orders }> {
    return this.http.get<{message: string, data: Orders}>(this.getByIDURL + "/" + order_Id, { headers: this.authService.genHeader()});
  }

  getOrderByCustomerId(customerId: string | undefined): Observable<{ message: string; data: Orders }> {
    return this.http.get<{message: string, data: Orders}>(this.getByCustomerIDURL + "/" + customerId, { headers: this.authService.genHeader()});
  }

  
}
