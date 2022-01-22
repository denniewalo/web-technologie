import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ReportingService} from "../../services/reportingService/reporting.service";
import {Orders} from "../../interfaces/Orders";


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  customerId = new FormControl("");
  orderStatus = new FormControl("");
  beforeTime = new FormControl("");
  orders: Orders[] | undefined;

  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
  }

  allOrders() {
    this.reportingService.getOrders().subscribe((data) => {
      this.orders = data.data.Orders;
      const blob = new Blob([JSON.stringify(this.orders, null, 2)], {type: 'application/json'});
      const downloadbutton = document.getElementById("b1");
        // @ts-ignore
      downloadbutton.href = URL.createObjectURL(blob);
      // @ts-ignore
      downloadbutton.click();

    })
  }

  orderByCustomerId() {
    this.reportingService.getOrderByCustomerId(this.customerId.value).subscribe((data) => {
      this.orders = data.data.OrdersCustomerId;
      const blob = new Blob([JSON.stringify(this.orders, null, 2)], {type: 'application/json'});
      const downloadbutton = document.getElementById("b2");
      // @ts-ignore
      downloadbutton.href = URL.createObjectURL(blob);
      // @ts-ignore
      downloadbutton.click();
    });
  }
  orderByStatus() {
    console.log(this.orderStatus.value);
    this.reportingService.getOrdersByStatus(this.orderStatus.value).subscribe((data) => {
      this.orders = data.data.OrdersByStatus;
      const blob = new Blob([JSON.stringify(this.orders, null, 2)], {type: 'application/json'});
      const downloadbutton = document.getElementById("b3");
      // @ts-ignore
      downloadbutton.href = URL.createObjectURL(blob);
      // @ts-ignore
      downloadbutton.click();
    });
  }
  orderBeforeTime() {
    let unixTime = String (new Date(this.beforeTime.value).getTime())
    this.reportingService.getOrdersBeforeDate(unixTime).subscribe((data) => {
      this.orders = data.data.OrdersCreatedAfter;
      const blob = new Blob([JSON.stringify(this.orders, null, 2)], {type: 'application/json'});
      const downloadbutton = document.getElementById("b4");
      // @ts-ignore
      downloadbutton.href = URL.createObjectURL(blob);
      // @ts-ignore
      downloadbutton.click();
    })
  }
}
