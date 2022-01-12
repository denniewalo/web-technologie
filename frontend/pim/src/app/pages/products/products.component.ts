import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";

import { Product } from "../../interfaces/Product";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProduct().subscribe((res) => {
      console.log(res.data);
      this.products = res.data;
    });
  }

  onDelete(product: Product) : any {
    this.productService.deleteProduct(product._id).subscribe((res) => {
      console.log(res.status);
      if(res.status == "success"){
        console.log("Delete " + product._id);
        window.location.reload();
      }else{
        console.log("Deletion of " + product._id + " not successfull");
      }
    })
  }
  onEdit(product: Product) : any {
    this.router.navigate(['/edit', product._id]);
  }

}
