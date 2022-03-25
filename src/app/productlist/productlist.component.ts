import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../models";
 
@Component({
  selector: "app-productlist",
  templateUrl: "./productlist.component.html",
  styleUrls: ["./productlist.component.css"]
})
export class ProductlistComponent implements OnInit {
  products: Product[] = [];
  status: number = 0;
  message: string = '';

  constructor(private service: ProductService) {
  }
 
  ngOnInit() {
    this.getProducts();
  }
  //Fetch all products
  getProducts() {
    this.service.getProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error: error => {
        this.status = error.status;
        this.message = error.message;
      }
    });
  }
 
  deleteProduct(event: any) {
    if (window.confirm("Are you sure to delete this product?")) {
      //console.log(event._id);
      this.service.deleteProductById(event._id).subscribe({
        next: successCode => {
          this.status = successCode;
          this.getProducts();
        },
        error: error => {
          this.status = error.status;
          this.message = error.message;
        }
      });
    }
  }
}