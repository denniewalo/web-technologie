import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Orders } from "./../../interfaces/Orders"

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  private reportingURL = "http://localhost:3000/graphql"
  constructor(private http: HttpClient) { }

  getOrders() {
    const paramQuery = new HttpParams().set("query", "{\n" +
      "  Orders {\n" +
      "    ordersId,\n" +
      "    customerId,\n" +
      "    price,\n" +
      "    status,\n" +
      "    products\n" +
      "  }\n" +
      "}")
    return this.http.get<{"data": { "Orders": Orders[] }}>(this.reportingURL, {params: paramQuery});
  }

  getOrderByCustomerId(customerId : string){
    const paramQuery = new HttpParams().set("query", 'query {\n' +
      `  OrdersCustomerId (customerId: "${customerId}"){\n` +
      '    ordersId,\n' +
      '    customerId,\n' +
      '    price,\n' +
      '\t\tstatus,\n' +
      '    products\n' +
      '\t}\n' +
      '}')
    return this.http.get<{"data": {"OrdersCustomerId" : Orders[]}}>(this.reportingURL, {params: paramQuery});
  }

  getOrdersByStatus(orderStatus: string) {
    const paramQuery = new HttpParams().set("query", "query {\n" +
      `  OrdersByStatus (status: "${orderStatus}"){\n` +
      "    ordersId,\n" +
      "    customerId,\n" +
      "    price,\n" +
      "\t\tstatus,\n" +
      "    products\n" +
      "\t}\n" +
      "}")
    return this.http.get<{"data": {"OrdersByStatus" : Orders[]}}>(this.reportingURL, {params: paramQuery});
  }

  getOrdersBeforeDate(time: string){
    const paramQuery = new HttpParams().set("query", "query {\n" +
      `  OrdersCreatedAfter (time: "${time}"){\n` +
      "    ordersId,\n" +
      "    customerId,\n" +
      "    price,\n" +
      "\t\tstatus,\n" +
      "    products\n" +
      "\t}\n" +
      "}")
    return this.http.get<{"data": {"OrdersCreatedAfter" : Orders[]}}>(this.reportingURL, {params: paramQuery});
  }

}
