import { Injectable } from "@angular/core";
import { vols } from "../../../backup";

Injectable({
    providedIn: 'root'
})

export class BackupService {
    get allBackups() {
        return vols
    }
}