import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientDeliveryService } from './client-service.service';
import { DeliveryModel } from './client-service.model';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { ChangeDetectorRef } from '@angular/core';






@Component({
  selector: 'app-client-service',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridAngular],
  templateUrl: './client-service.component.html',
  styleUrl: './client-service.component.scss'
})
export class ClientServiceComponent implements OnInit, OnDestroy {

  // Define the date variables
  date = new Date();
  day = String(this.date.getDate()).padStart(2,'0');
  month = String(this.date.getMonth()+1).padStart(2,'0');
  year = this.date.getFullYear();

  // Formate todays date in YYYY-MM-DD
  today =  this.year + "-" + this.month +"-"+ this.day;

  // Array to store all delivery tasks
  allDeliveryTasks!: DeliveryModel[];
  filteredDeliveryTask!: DeliveryModel[];
  filteredPreviousTasks!: DeliveryModel[];

  // Object to hold data for a new client
  newClient: DeliveryModel = new DeliveryModel()

  // Subscription object to manage observable subscriptions
  allDeliverySubscription!: Subscription;

  // ColDef
  colDefs: ColDef[] = [
    { field: 'client_name', headerName: 'Client Name', sortable: true, filter: true },
    { field: 'delivery_status', headerName: 'Delivery Status', sortable: true, filter: true },
    { field: 'delivery_type', headerName: 'Delivery Type', sortable: true, filter: true },
    { field: 'delivery_date', headerName: 'Delivery Date', sortable: true, filter: true },
    { field: 'remarks', headerName: 'Remarks', sortable: true, filter: true },
    { headerName: 'Action',
      cellRenderer: (params: any) => {
      // Create the button directly and return it as HTML
      const button = document.createElement('button');
      button.innerText = 'Complete';
      
      // Add a click event listener to handle the click
      button.addEventListener('click', () => {
        this.completedTask(params.data); // Call the completedTask method
      });

      return button;      }
     }
  ]



  constructor(private clientDeliveryService: ClientDeliveryService, private cdr: ChangeDetectorRef){}

  /**
  * Lifecycle hook that runs when the component initializes.
  * Fetches all delivery tasks from the service.
  */
  ngOnInit(): void {
    this.allDeliverySubscription = this.clientDeliveryService.allDelivery().subscribe(data=>{
      this.allDeliveryTasks = data;

      this.filteredDeliveryTask = this.allDeliveryTasks.filter(tasks=>tasks.delivery_status!= "Completed" && tasks.delivery_date===this.today)
      this.filteredPreviousTasks = this.allDeliveryTasks.filter(tasks=>tasks.delivery_status!= "Completed" && tasks.delivery_date<this.today)
    })
  }

  ngOnDestroy(): void {
    this.allDeliverySubscription.unsubscribe();
  }

  /**
   * Marks a task as completed by updating its status.
   * Calls the service to update the status in the database.
   * @param client - The delivery task to be marked as completed.
   */
  completedTask(client: DeliveryModel): void {
    client.delivery_status = "Completed";
    this.clientDeliveryService.updateStatus(client).subscribe(response=>{
      console.log(response)

      // Refresh the delivery tasks list after adding a new client
      this.clientDeliveryService.allDelivery().subscribe(data=>{
        this.allDeliveryTasks = data;
        this.filteredDeliveryTask = this.allDeliveryTasks.filter(tasks=>tasks.delivery_status!= "Completed" && tasks.delivery_date=== this.today)
        this.filteredPreviousTasks = this.allDeliveryTasks.filter(tasks=>tasks.delivery_status!= "Completed" && tasks.delivery_date<this.today)
        this.cdr.detectChanges();

      })
    })
  }


    /**
   * Adds a new client to the database.
   * Calls the service to save the new client and refreshes the task list.
   */
  addNewClient() {
    this.clientDeliveryService.addNewClientToDB(this.newClient).subscribe(response=>{
      console.log("response", response);

      // Reset the newClient object after adding a new entry
      this.newClient = new DeliveryModel();

      // Refresh the delivery tasks list after adding a new client
      this.clientDeliveryService.allDelivery().subscribe(data=>{
        this.allDeliveryTasks = data;
        this.filteredDeliveryTask = this.allDeliveryTasks.filter(tasks=>tasks.delivery_status!= "Completed" && tasks.delivery_date=== this.today)
        this.filteredPreviousTasks = this.allDeliveryTasks.filter(tasks=>tasks.delivery_status!= "Completed" && tasks.delivery_date<this.today)
      },error=>{console.log("error", error)}) 
    })
  }

}
