import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-service.component.html',
  styleUrl: './client-service.component.scss'
})
export class ClientServiceComponent implements OnInit {
  data = [
    {
      "client_name" : "client",
      // Termination, provision, Test
      "delivery_type" : "Test", 
      // "delivery_type" : "Termination",
      // "delivery_type" : "Provision",
      "delivery_status" : "Pending",
      "delivery_date" : "16/03/2025",
      "remarks" : "Loream Ipsum is the",
    }
  ]

  date = new Date();
  day = String(this.date.getDate()).padStart(2,'0');
  month = String(this.date.getMonth()+1).padStart(2,'0');
  year = this.date.getFullYear();
  today = this.day + '/' + this.month + '/' + this.year;
  isCompleted= false;

  ngOnInit(): void {
    // if(this.data.delivery_date === this.today) {
    //   console.log("Date Matched")
    // } else {
    //   console.log("Date does not matched")
    //   console.log(this.data.delivery_date)
    //   console.log(this.today)
    // }
  }
}
