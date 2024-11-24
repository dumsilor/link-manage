import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { UpdateService } from './update.service';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { ShortenPipe } from '../../../shared/pipe/shorten.pipe';
import { InputFormComponent } from "../../../shared/components/input-form/input-form.component";

@Component({
  selector: 'app-shift-update',
  standalone: true,
  imports: [TableComponent, TitleComponent, InputFormComponent],
  templateUrl: './shift-update.component.html',
  styleUrl: './shift-update.component.scss',
  providers: [UpdateService]
})
export class ShiftUpdateComponent implements OnInit {
  tableHeaderList = ['date','details','remarks','Sales_Concern','reference','handler']
  updateDataList: any[] = [];

  constructor(private updateService: UpdateService) {}

  ngOnInit(): void {
      this.updateDataList = this.updateService.allUpdate;
  }


}
