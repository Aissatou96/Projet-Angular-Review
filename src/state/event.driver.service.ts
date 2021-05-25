import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {ActionEvent} from "./product.state";

@Injectable({providedIn: 'root'})

export class EventDriverService{
  //On créé un subject
  sourceEventSubject:Subject<ActionEvent>=new Subject<ActionEvent>();
  //On créé un observable à partir de ce subject
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  /*On publie l'événement avec la fonction ci-après publishEvent(event:ActionEvent) et tous les components qui
      souscrivent à l'observable sourceEventSubjectObservable recevront l'événement publié*/

  publishEvent(event:ActionEvent){
    this.sourceEventSubject.next(event);
  }
}

