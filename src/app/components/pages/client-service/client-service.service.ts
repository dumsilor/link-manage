import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeliveryModel } from "./client-service.model";
import { Observable } from "rxjs";
import { DELIVERY_CREATE_URL, DELIVERY_UPDATE_URL, DELIVERY_URL } from "../../../shared/constants/backend";

@Injectable({
    providedIn: 'root'
  })

//TODO: change the URI of the Delivery API after Full development

export class ClientDeliveryService {

    constructor(private httpClient: HttpClient){}

    allDelivery(): Observable<DeliveryModel[]> {
        return this.httpClient.get<DeliveryModel[]>(DELIVERY_URL)
    }

    addNewClientToDB(newClient: DeliveryModel){
        return this.httpClient.post(DELIVERY_CREATE_URL, newClient)
    }

    updateStatus(newStatus: DeliveryModel) {
        return this.httpClient.put(`${DELIVERY_UPDATE_URL}/${newStatus._id}`, newStatus, {responseType: 'text'})
    }


}