import { Injectable } from "@angular/core";
import { sample_update } from "./sample_update";
import { Observable } from "rxjs";
import { Update } from "../../../shared/model/update.model";
import { HttpClient } from "@angular/common/http";
import { UPDATE_ADD_URL, UPDATE_GET_URL } from "../../../shared/constants/backend";

@Injectable({
    providedIn: 'root'
})

export class UpdateService{

    constructor(private httpClient: HttpClient){}

    allUpdate() {
        return this.httpClient.get<Update[]>(UPDATE_GET_URL)
    }

    addUpdate(newUpdate: Update) {
        newUpdate.deleted = false;
        this.httpClient.post(UPDATE_ADD_URL,newUpdate).subscribe((log)=>{
            console.log(log)
        })
    }
}

