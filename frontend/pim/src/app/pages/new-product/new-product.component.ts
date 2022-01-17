import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

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
    "file": new FormControl(),
    "fileSource": new FormControl(),
    "imageURL": new FormControl(),
  });

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    // @ts-ignore
    console.log(this.productForm.get("fileSource").value);
    // @ts-ignore
    this.productService.createProduct(this.productForm.get("id").value, this.productForm.get("name").value, this.productForm.get("price").value + "$", this.productForm.get("fileSource").value)
      .subscribe((res) => {
      if (res.message == "New product created!"){
        console.log("New product created")
        this.router.navigate(['/products']);
      }else{
        console.log("New product NOT created!")
      }
    })
  }

  get f(){
    return this.productForm.controls;
  }

  onFileChange($event: Event) {
    // @ts-ignore
    if (event.target.files.length > 0) {
      // @ts-ignore
      const file = event.target.files[0];
      this.productForm.patchValue({
        fileSource: file
      });
    }
  }
}
