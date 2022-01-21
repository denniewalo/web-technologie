import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { WebSocketServiceService } from 'src/app/services/WebSocketService/web-socket-service.service';

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

  constructor(private router: Router,
              private productService: ProductService,
              private websocketServiceService: WebSocketServiceService,
              private toastr: ToastrService) {

  };

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    // @ts-ignore
    console.log(this.productForm.get("fileSource").value);
    // @ts-ignore
    this.productService.createProduct(this.productForm.get("id").value, this.productForm.get("name").value, this.productForm.get("price").value, this.productForm.get("fileSource").value)
      .subscribe((res) => {
      if (res.message == "New product created!"){
        this.websocketServiceService.socket.emit("createProdukt");
        this.showToastr(true);
        this.router.navigate(['/products']);
      }else{
        this.showToastr(false);
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
