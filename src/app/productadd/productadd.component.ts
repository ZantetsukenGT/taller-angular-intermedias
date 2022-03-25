import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
 
import { ProductService } from "../product.service";
 
@Component({
  selector: "app-productadd",
  templateUrl: "./productadd.component.html",
  styleUrls: ["./productadd.component.css"]
})
export class ProductaddComponent implements OnInit {
  status: number = 0;
  message: string = '';
  _id: string | null = null;
 
  //Create form
  productForm = new FormGroup({
    _id: new FormControl({value: null, disabled: true}),
    name: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    price: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.min(0),
        Validators.max(2147483647)
      ])
    )
  });
 
  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get("_id");
    //console.log(this._id);
    if (this._id != null) {
      this.service.getProductById(this._id).subscribe({
        next: product => {
          //console.log(product);
          this.productForm.setValue({
            _id: product._id,
            name: product.name,
            price: product.price
          });
        },
        error: error => {
          this.status = error.status;
          this.message = error.message;
        }
      });
    }
  }
 
  //Handle create and update product
  onClickSubmit() {
    if (this.productForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    let product = this.productForm.getRawValue();
    //console.log(product);
    if (product._id == null) {
      //Create product
      this.service.createProduct(product).subscribe({
        next: status => {
          this.status = status;
          this.router.navigate(["productlist"]);
        },
        error: error => {
          this.status = error.status;
          this.message = error.message;
        }
      });
    } else {
      //Update product
      this.service.updateProduct(product).subscribe({
        next: status => {
          this.status = status;
          this.router.navigate(["productlist"]);
        },
        error: error => {
          this.status = error.statusCode;
          this.message = error.message;
        }
      });
    }
  }
}