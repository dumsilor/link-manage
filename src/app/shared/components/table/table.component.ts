import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
@Output() complete: EventEmitter<string> = new EventEmitter<string>()
@Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>()


expandRowIndex: number | null = null;

toggleRow(index: number){
  this.expandRowIndex = this.expandRowIndex === index ? null : index;
}

getRowNumber(index: number): number {
  return this.expandRowIndex === index ? 15000 : 75;
}

onComplete() {
 this.complete.emit("Complete")
}

onDelete() {
  this.delete.emit(true)
}

}
