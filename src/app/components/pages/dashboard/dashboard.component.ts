import { Component, OnInit } from '@angular/core';
import { monitoring_tools_links, service_links, tools_links, shift_tasks, client_docs } from './dashboard-data';
import { navLink } from '../../../shared/model/nav-link.model';
import { CommonModule } from '@angular/common';

//TODO1: Create a document list in data-ts file


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  service_link!: navLink[];
  monitoring_links!: navLink[];
  tools_links!: navLink[];
  shift_tasks_links!: navLink[];
  client_doc_links!: navLink[];
  document_links!: navLink[];
  

  ngOnInit(): void {
    this.service_link = service_links;
    this.monitoring_links = monitoring_tools_links;
    this.tools_links = tools_links;
    this.shift_tasks_links = shift_tasks;
    this.client_doc_links = client_docs;
  }
}
