import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productForm = new FormGroup({
    "id": new FormControl(),
    "name": new FormControl(),
    "price": new FormControl(),
    "imageURL": new FormControl()
  });

  constructor(private router: Router,
              private productService: ProductService,
              private toastr: ToastrService) {

  };

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    // @ts-ignore
    this.productService.createProduct(this.productForm.get("id").value, this.productForm.get("name").value, this.productForm.get("price").value, this.productForm.get("imageURL").value).subscribe((res) => {
      if (res.message == "New product created!"){
        this.showToastr(true);
        this.router.navigate(['/products']);
      }else{
        this.showToastr(false);
      }
    })
  }

  showToastr(isCreated: boolean) {
    if(isCreated) {
      this.toastr.success("Product created!", "ProductService");
    } else {
      this.toastr.error("Product not created", "ProductService", {
        timeOut: 4000,
        progressBar: false
      });
    }
  }

}
