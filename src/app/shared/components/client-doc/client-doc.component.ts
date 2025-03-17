import { Component, OnInit } from '@angular/core';
import { client_doc_resource } from './client-doc.data';

@Component({
  selector: 'app-client-doc',
  standalone: true,
  imports: [],
  templateUrl: './client-doc.component.html',
  styleUrl: './client-doc.component.scss'
})
export class ClientDocComponent implements OnInit {
  client_resources!: {"resource_type" : string, "s3_api_url": string}[];
  ngOnInit(): void {
    this.client_resources = client_doc_resource;
  }
  
}
