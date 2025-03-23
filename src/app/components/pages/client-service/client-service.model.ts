export class DeliveryModel {
    _id?: string;
    client_name!: string;
    // Termination, provision, Test
    delivery_type!: string; 
    // "delivery_type" : "Termination",
    // "delivery_type" : "Provision",
    delivery_status!: string;
    delivery_date!: string;
    remarks!: string;
}