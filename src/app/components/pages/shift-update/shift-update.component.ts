import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TableComponent } from '../../../shared/components/table/table.component';
import { UpdateService } from './update.service';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { InputFormComponent } from "../../../shared/components/input-form/input-form.component";
import { Update } from '../../../shared/model/update.model';

@Component({
  selector: 'app-shift-update',
  standalone: true,
  imports: [TableComponent, TitleComponent, InputFormComponent],
  templateUrl: './shift-update.component.html',
  styleUrl: './shift-update.component.scss',
  providers: [UpdateService]
})
export class ShiftUpdateComponent implements OnInit, OnDestroy {
  tableHeaderList = ['Date','Details','Remarks','Sales','Reference','Handler', 'Status']
  updateDataList: Update[] = [];
  updateListSubscription!: Subscription;


  constructor(private updateService: UpdateService) {}

  ngOnInit(): void {
       this.updateListSubscription = this.updateService.allUpdate().subscribe((update)=>{
        this.updateDataList = update;
        console.log(this.updateDataList.keys)
       });
      console.log(this.completeTask)
  }

  ngOnDestroy(): void {
    this.updateListSubscription.unsubscribe();
  }

  completeTask(event: string) {
    //
  }

  deleteTask(event: boolean) {
    //
  }

  addUpdate(newUpdate:any){
  this.updateService.addUpdate(newUpdate);
  }
  onClick(){
    this.updateService.allUpdate().subscribe((update)=>{
      this.updateDataList = update;
    })
  }
}
