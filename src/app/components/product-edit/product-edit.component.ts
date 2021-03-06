import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventDriverService} from "../../../state/event.driver.service";
import {ProductActionsTypes} from "../../../state/product.state";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId: number | any;
  productFormGroup: FormGroup | any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private productsService:ProductsService,
    private fb:FormBuilder,
    private eventDriverService:EventDriverService
  ) {
    this.productId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productsService.getProduct(this.productId).subscribe(product=>{
      this.productFormGroup = this.fb.group({
        id:[product.id,Validators.required],
        name:[product.name,Validators.required],
        price:[product.price,Validators.required],
        quantity:[product.quantity,Validators.required],
        selected:[product.selected,Validators.required],
        available:[product.available,Validators.required]
      })
    })
  }

  onUpdateProduct() {
    this.productsService.updateProduct(this.productFormGroup.value).subscribe(data=>{
        this.eventDriverService.publishEvent({type:ProductActionsTypes.PRODUCT_UPDATED})
        alert("success");
    })
  }
}
