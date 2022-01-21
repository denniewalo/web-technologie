import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/interfaces/Orders';
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

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrder().subscribe((res) => {
      console.log(res.data);
      this.orders = res.data;
  });
  }

  

}
