import { Component, OnInit } from '@angular/core';
import { ToolComponent } from "../../partials/tool/tool.component";
import { ToolListService } from '../../../shared/module/tool-list.module';
import { Tool } from '../../../shared/model/tool.model';
import { CommonModule } from '@angular/common';
import { TitleComponent } from "../../partials/title/title.component";
import { credService } from './tool-list.service';

@Component({
  selector: 'app-tool-list',
  standalone: true,
  imports: [ToolComponent, CommonModule, TitleComponent],
  templateUrl: './tool-list.component.html',
  styleUrl: './tool-list.component.scss'
})
export class ToolListComponent implements OnInit {
  credList!: Tool[];

  constructor(private toolListService: ToolListService, private credService: credService) {}

  ngOnInit() {
    // this.tools = this.toolListService.getAllTools()
    this.credService.getAllCreds().subscribe((creds)=>{
      this.credList = creds;
    })
  }
  
}
