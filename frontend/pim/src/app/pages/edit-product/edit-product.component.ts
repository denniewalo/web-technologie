import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { ToastrService } from "ngx-toastr";

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
  isEdited: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private toastr: ToastrService) { }

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
    this.productService.updateProduct(this.product_id, this.productForm.get("id").value, this.productForm.get("name").value, this.productForm.get("price").value, this.productForm.get("imageURL").value).subscribe((res) => {
      if (res.message == "Product Info updated"){
        this.showToastr(true);
        this.router.navigate(['/products']);
        this.isEdited = true;
      } else {
        this.showToastr(false);
      }
    })
  }

  showToastr(isCreated: boolean) {
    if(isCreated) {
      this.toastr.success("Product edited!", "ProductService");
    } else {
      this.toastr.error("Product not edited", "ProductService", {
        timeOut: 4000,
        progressBar: false
      });
    }
  }

}
