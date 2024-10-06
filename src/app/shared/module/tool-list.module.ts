import { Injectable } from "@angular/core";
import { Tool } from "../model/tool.model";
import { all_tools } from "../../urls";

@Injectable({
    providedIn: 'root'
})

export class ToolListService {

    getAllTools() {
        return all_tools;
    }
}