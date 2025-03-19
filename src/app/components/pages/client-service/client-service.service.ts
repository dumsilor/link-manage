import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeliveryModel } from "./client-service.model";
import { Observable } from "rxjs";

Injectable({'providedIn': 'root'})

export class ClientDeliveryService {

    constructor(private httpClient: HttpClient){}

    allDelivery(): Observable<DeliveryModel[]> {
        return this.httpClient.get<DeliveryModel[]>("http://localhost:3000/delivery")
    }
}