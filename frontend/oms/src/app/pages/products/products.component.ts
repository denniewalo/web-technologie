import { Component, OnInit } from '@angular/core';
import { ProductService }    from "../../services/product.service";
import { Product } from "../../interfaces/Product";
import { CartService } from "../../services/cart.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  imageBaseUrl = "assets/images/";

  constructor(private productService: ProductService,
              private cartService: CartService,
              private toastr: ToastrService
              ) { }

  ngOnInit(): void {
    this.productService.getProduct().subscribe((res) => {
      this.products = res.data;
    })
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toaster();
  }

  toaster() {
    this.toastr.success("Product added to cart!", "");
  }
  
}
