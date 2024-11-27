import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UpdateService } from './update.service';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { InputFormComponent } from "../../../shared/components/input-form/input-form.component";
import { Update } from '../../../shared/model/update.model';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../../shared/pipe/shorten.pipe';

@Component({
  selector: 'app-shift-update',
  standalone: true,
  imports: [TitleComponent, InputFormComponent, CommonModule, ShortenPipe],
  templateUrl: './shift-update.component.html',
  styleUrl: './shift-update.component.scss',
  providers: [UpdateService]
})
export class ShiftUpdateComponent implements OnInit, OnDestroy {
  tableHeaderList = ['Date','Details','Remarks','Sales','Reference','Handler', 'Status']
  updateDataList!: Update[];
  updateListSubscription!: Subscription;


  constructor(private updateService: UpdateService) {}

  ngOnInit(): void {
       this.updateListSubscription = this.updateService.allUpdate().subscribe((update)=>{
        this.updateDataList = update;
       });
  }

  ngOnDestroy(): void {
    this.updateListSubscription.unsubscribe();
  }

  addUpdate(newUpdate:any){
  this.updateService.addUpdate(newUpdate).subscribe((res)=>{
    console.log(res);
    this.fetchUpdates()
  })
  }

  onClick(){
    this.updateService.allUpdate().subscribe((update)=>{
      this.updateDataList = update;
    })
  }

  expandRowIndex: number | null = null;

toggleRow(index: number){
  this.expandRowIndex = this.expandRowIndex === index ? null : index;
}
getRowNumber(index: number): number {
  return this.expandRowIndex === index ? 15000 : 75;
}

onComplete(update: Update){
  update.Status = "completed";
  this.updateService.updateStatus(update)
}

onDelete(data: any) {
  console.log(data)
  this.updateService.deleteUpdate(data).subscribe({
    next: () => this.fetchUpdates(),
    error: (err) => console.log(err)
  })
}

// clickToAdd(){
//   const test_update: Update = { 
//     id: "",
//     Date: '11-11-23',
//     Details: 'Test-details',
//     Remarks: 'Test-remarks',
//     Sales_Concern: 'test-concernt',
//     Reference: 'test-reference',
//     Handler: 'test-handler',
//     Status: 'test-status',
//     deleted: false
//   }
//   this.updateService.addUpdate(test_update).subscribe((res)=>{
//     console.log(res)
//     this.fetchUpdates()
//   })
// }

private fetchUpdates(): void {
  this.updateService.allUpdate().subscribe((update) => {
    this.updateDataList = update;
  });
}
}
