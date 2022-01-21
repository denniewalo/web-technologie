import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { OrderService } from '../../services/orders/order.service';
import { Orders } from '../../interfaces/Orders';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders: Orders[] = [];
  orderForm : any;
  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrder().subscribe((res) => {
      console.log(res.data);
      this.orders = res.data;
  });
    this.orderForm = new FormGroup({
    "orderId": new FormControl(),
    "customerId": new FormControl(),
    "products": new FormControl(),
    "price": new FormControl(),
    "status": new FormControl()
  });
 }

 onCreate(){
  this.orderService.createOrder(this.orderForm.get("orderId").value, this.orderForm.get("customerId").value, this.orderForm.get("products").value,this.orderForm.get("price").value, this.orderForm.get("status").value)
  .subscribe((res) => {
  if (res.message == "New product created!"){
    this.router.navigate(['/orders']);
   }
  })
 }

 onEdit(orders: Orders) : any {
  this.router.navigate(['/update-status', orders._id]);
}
}
