import { Component, EventEmitter, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { UpdateService } from './update.service';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { ShortenPipe } from '../../../shared/pipe/shorten.pipe';
import { InputFormComponent } from "../../../shared/components/input-form/input-form.component";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shift-update',
  standalone: true,
  imports: [TableComponent, TitleComponent, InputFormComponent],
  templateUrl: './shift-update.component.html',
  styleUrl: './shift-update.component.scss',
  providers: [UpdateService]
})
export class ShiftUpdateComponent implements OnInit {
  tableHeaderList = ['Date','Details','Remarks','Sales','Reference','Handler', 'Status']
  updateDataList: any[] = [];



  constructor(private updateService: UpdateService) {}

  ngOnInit(): void {
      this.updateDataList = this.updateService.allUpdate;
      console.log(this.completeTask)
  }

  completeTask(event: string) {
    console.log(event)
  }

  deleteTask(event: boolean) {

  }
}
