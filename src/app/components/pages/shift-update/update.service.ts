import { Injectable } from "@angular/core";
import { sample_update } from "./sample_update";

Injectable({
    providedIn: 'root'
})

export class UpdateService{
    get allUpdate(){
        return sample_update;
    }
}

