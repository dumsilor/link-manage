import { Injectable } from "@angular/core";
import { vols } from "../../../backup";
import { HttpClient } from "@angular/common/http";
import { Backup } from "../../../shared/model/backup.model";
import { Observable } from "rxjs";
import { BACKUP_GET_URL } from "../../../shared/constants/backend";

@Injectable({
    providedIn: 'root',
})


export class BackupService {
    // get allBackups() {
    //     return vols
    // }
    private backupUrl = '';

    constructor(private httpClient: HttpClient){}

    allBackups(): Observable<Backup[]> {
        return this.httpClient.get<Backup[]>(BACKUP_GET_URL)
    }
}