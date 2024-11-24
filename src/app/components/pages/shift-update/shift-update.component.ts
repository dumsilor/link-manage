import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { UpdateService } from './update.service';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { ShortenPipe } from '../../../shared/pipe/shorten.pipe';

@Component({
  selector: 'app-shift-update',
  standalone: true,
  imports: [TableComponent, TitleComponent, ],
  templateUrl: './shift-update.component.html',
  styleUrl: './shift-update.component.scss',
  providers: [UpdateService]
})
export class ShiftUpdateComponent implements OnInit {
  tableHeaderList = ['date','detail','ref','handler']
  updateDataList: any[] = [];

  constructor(private updateService: UpdateService) {}

  ngOnInit(): void {
      this.updateDataList = this.updateService.allUpdate;
  }


}
