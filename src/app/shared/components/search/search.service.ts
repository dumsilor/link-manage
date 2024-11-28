import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BACKUP_GET_URL } from "../../constants/backend";
import { Backup } from "../../model/backup.model";

@Injectable({providedIn:'root'})

export class searchService {

    constructor(private httpClient: HttpClient){}

    search(term: string){
        console.log(term)
        let params = new HttpParams().set('term',term)

        return this.httpClient.post<Backup[]>(BACKUP_GET_URL+"/search",{term})
    }
}