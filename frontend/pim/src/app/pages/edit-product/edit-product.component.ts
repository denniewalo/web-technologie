import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm : any;
  product_id : any;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.product_id = this.router.url.split('/').pop();
    this.productForm = new FormGroup({
      "id": new FormControl(),
      "name": new FormControl(),
      "price": new FormControl(),
      "imageURL": new FormControl()
    });
    this.productService.getProductById(this.product_id).subscribe((res) => {
      this.productForm.patchValue({
        "id": res.data.id,
        "name": res.data.name,
        "price": res.data.price,
        "imageURL": res.data.imageURL,
      });
    })
  }

  onFormSubmit(): void {
    console.log(this.productForm.get("id").value);
    this.productService.updateProduct(this.product_id, this.productForm.get("id").value, this.productForm.get("name").value, this.productForm.get("price").value, this.productForm.get("imageURL").value).subscribe((res) => {
      if (res.message == "Product Info updated"){
        console.log("Product Info updated");
        this.router.navigate(['/products']);
      }else{
        console.log("Product Info NOT updated!");
      }
    })
  }

}
