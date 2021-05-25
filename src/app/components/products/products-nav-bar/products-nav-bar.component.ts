import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes} from "../../../../state/product.state";
import {EventDriverService} from "../../../../state/event.driver.service";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {
//Emettre un événement avec  EventEmitter() sur sa sortie @Output
  //@Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter()

  constructor(
    private eventDriverService: EventDriverService
  ) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    //this.eventEmitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS});
    this.eventDriverService.publishEvent({type:ProductActionsTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
    //this.eventEmitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
    this.eventDriverService.publishEvent({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts() {
    //this.eventEmitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
    this.eventDriverService.publishEvent({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
  }

  onNewProduct() {
    //this.eventEmitter.emit({type:ProductActionsTypes.NEW_PRODUCT});
    this.eventDriverService.publishEvent({type:ProductActionsTypes.NEW_PRODUCT});
  }

  onSearch(dataForm: any) {
    //this.eventEmitter.emit({type:ProductActionsTypes.SEARCH_PRODUCTS,payload:dataForm});
    this.eventDriverService.publishEvent({type:ProductActionsTypes.SEARCH_PRODUCTS,payload:dataForm});
  }
}
