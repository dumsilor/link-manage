import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tool } from "../../../shared/model/tool.model";
import { HttpClient } from "@angular/common/http";
import { SECRET_URL } from "../../../shared/constants/backend";

@Injectable({
    providedIn: 'root'
})

export class credService {

    constructor(private httpClient: HttpClient){}
    
    getAllCreds(): Observable<Tool[]> {
        return this.httpClient.get<Tool[]>(SECRET_URL)
    }
}