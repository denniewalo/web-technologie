import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/interfaces/Orders';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LokalstorageService } from 'src/app/services/localstorageService/lokalstorage.service';
import { OrderService } from 'src/app/services/orderService/order.service';
import {Product} from "../../interfaces/Product";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders: Orders [] = [];

  //public orders: Orders [] = [{"_id":"orderID","ordersId":"orderId", "customerId":"customerID","products":"products","price":"price","status":"status"}];

  constructor(
    private orderService: OrderService,
    private authService: AuthService, 
    private lokalstorageService: LokalstorageService,
  ) { }

 
  ngOnInit(): void {
    // @ts-ignore
    this.orderService.getOrderByCustomerId(this.lokalstorageService.getUserId()).subscribe((res) => {
      console.log(res.data);
      this.orders = res.data;
  });
  }

  /**
   * ngOnInit(): void {
    this.orderService.getOrder().subscribe((res) => {
      console.log(res.data);
      this.orders = res.data;
  });
  }
   */
}
