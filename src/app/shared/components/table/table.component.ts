import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Update } from '../../model/update.model';
import { ShortenPipe } from '../../pipe/shorten.pipe';

interface RowData {
  [key: string]: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ShortenPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
@Input() 
@Input() tableHeaders: string[] = ['demo1','demo2','demo3']
@Input() rowDataList!: any[];

expandRowIndex: number | null = null;

toggleRow(index: number){
  this.expandRowIndex = this.expandRowIndex === index ? null : index;
}

getRowNumber(index: number): number {
  return this.expandRowIndex === index ? 15000 : 75;
}

}
