import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bit',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './bit.component.html',
  styleUrl: './bit.component.scss'
})
export class BitComponent implements OnInit {
  value: number = 0;
  selectedUnit: string = "";
  factor: number = 0;


  ngOnInit(): void {
  }

onUnitClick(unit: string){
  this.selectedUnit = unit;
  switch (unit) {
    case 'bit':
      this.factor = 1024 ** 2 * 8 ;
      break;
    case 'bytes':
      this.factor = 1024 ** 2 ;
      break;
    case 'mb':
      this.factor = 1024 ** 1 ;
      break;
    case 'gb':
      this.factor = 1 ;
      break;
    case 'pb':
      this.factor = 1/1024 ;
      break;
    default:
      break;
  }
}


}
