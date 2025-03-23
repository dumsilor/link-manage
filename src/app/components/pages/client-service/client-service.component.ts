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
    this.allDeliverySubscription = this.clientDeliveryService.allDelivery().subscribe(data=>{
      this.allDeliveryTasks = data;
    })
  }

  ngOnDestroy(): void {
    this.allDeliverySubscription.unsubscribe();
  }

  completedTask(client: DeliveryModel): void {
    client.delivery_status = "Completed";
    this.clientDeliveryService.updateStatus(client).subscribe(response=>{
      console.log(response)
      this.clientDeliveryService.allDelivery().subscribe(data=>{
        this.allDeliveryTasks = data;
      })
    })
  }

  addNewClient() {
    this.clientDeliveryService.addNewClientToDB(this.newClient).subscribe(response=>{
      console.log("response", response);
      this.newClient = new DeliveryModel();
      this.clientDeliveryService.allDelivery().subscribe(data=>{
        this.allDeliveryTasks = data;
      },error=>{console.log("error", error)})
    })
  }
}
