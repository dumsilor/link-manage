import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClientDeliveryService } from './client-service.service';
import { DeliveryModel } from './client-service.model';

@Component({
  selector: 'app-client-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-service.component.html',
  styleUrl: './client-service.component.scss'
})
export class ClientServiceComponent implements OnInit {

  date = new Date();
  day = String(this.date.getDate()).padStart(2,'0');
  month = String(this.date.getMonth()+1).padStart(2,'0');
  year = this.date.getFullYear();
  today = this.day + '/' + this.month + '/' + this.year;
  isCompleted= false;
  allDeliveryTasks!: DeliveryModel[];

  constructor(private clientDeliveryService: ClientDeliveryService){}

  ngOnInit(): void {
    // if(this.data.delivery_date === this.today) {
    //   console.log("Date Matched")
    // } else {
    //   console.log("Date does not matched")
    //   console.log(this.data.delivery_date)
    //   console.log(this.today)
    // }

  this.clientDeliveryService.allDelivery().subscribe(data => {
      this.allDeliveryTasks = data;
    })
  }

  completedTask() {
    this.isCompleted = true;
  }
}
