import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product";
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../state/product.state";
import {catchError, map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //public products: Product[]|null=null;
  public products$:Observable<AppDataState<Product[]>>|null=null;
  //affecter un type à une variable
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
   this.products$ = this.productsService.getAllProducts().pipe(
     map(data=>({dataState:DataStateEnum.LOADED,data:data})),
     startWith({dataState:DataStateEnum.LOADING}),
     catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
   );
  }
  onGetSelectedProducts(){
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  onGetAvailableProducts(){
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  onSearch(dataForm:any){
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelect(p:Product){
    this.productsService.select(p).subscribe(data=>{
      p.selected = data.selected;
    })
  }

  onDelete(p:Product){
    let message = confirm("Etes-vous sûr de vouloir supprimer?");
    if(message){
      this.productsService.deleteProduct(p).subscribe(data=>{
        this.onGetAllProducts();
      })
    }

  }
}