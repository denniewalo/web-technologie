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
  ordersForm = new FormGroup({
    "ordersId": new FormControl(),
    "customerId": new FormControl(),
    "products": new FormControl(),
    "price": new FormControl(),
    "status": new FormControl()
  });
  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    // @ts-ignore
    this.orderService.createOrder(this.ordersForm.get("ordersId").value, this.ordersForm.get("customerId").value,this.ordersForm.get("products").value, this.ordersForm.get("price").value, this.ordersForm.get("status").value).subscribe((res) => {
      if (res.message == "New Order created!"){
        console.log("New Order created")
        this.router.navigate(['/orders']);
      }else{
        console.log("New order NOT created!")
      }
    })
  }

}
