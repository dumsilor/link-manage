import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientDeliveryService } from './client-service.service';
import { DeliveryModel } from './client-service.model';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

// ###############################################
// TODO: Client-Service
// Hide the Full Task if the isCompleted Field is true
// Add button for update



@Component({
  selector: 'app-client-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-service.component.html',
  styleUrl: './client-service.component.scss'
})
export class ClientServiceComponent implements OnInit, OnDestroy {

  date = new Date();
  day = String(this.date.getDate()).padStart(2,'0');
  month = String(this.date.getMonth()+1).padStart(2,'0');
  year = this.date.getFullYear();
  today =  this.year + "-" + this.month +"-"+ this.day;
  isCompleted= false;
  allDeliveryTasks!: DeliveryModel[];
  newClient: DeliveryModel = new DeliveryModel()
  allDeliverySubscription!: Subscription;

  
  constructor(private clientDeliveryService: ClientDeliveryService){}


  ngOnInit(): void {
    // if(this.data.delivery_date === this.today) {
    //   console.log("Date Matched")
    // } else {
    //   console.log("Date does not matched")
    //   console.log(this.data.delivery_date)
    //   console.log(this.today)
    // }
    this.allDeliverySubscription = this.clientDeliveryService.allDelivery().subscribe(data=>{
      this.allDeliveryTasks = data;
    })
  }

  ngOnDestroy(): void {
    this.allDeliverySubscription.unsubscribe();
  }

  completedTask() {
    
  }

  addNewClient() {
    this.clientDeliveryService.addNewClientToDB(this.newClient).subscribe(res=>{
      console.log(res);
      this.newClient = new DeliveryModel();
      this.clientDeliveryService.allDelivery().subscribe(data=>{
        this.allDeliveryTasks = data;
      })
    })
  }
}
