import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";

import { Product } from "../../interfaces/Product";
import {Observable} from "rxjs";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProduct().subscribe((res) => {
      console.log(res.data);
      this.products = res.data;
    });
  }

  onDelete(product: Product) : any {
    console.log("Delete " + product._id);
  }
  onEdit(product: Product) : any {
    console.log("Edit " + product._id);
  }

}
