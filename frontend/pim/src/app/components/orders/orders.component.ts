import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../services/orders/order.service';
import { Orders } from '../../interfaces/Orders';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
@Input() orders: Orders | any;

  constructor() { }

  ngOnInit(): void {
  }

}
