import { Component, OnInit } from '@angular/core';
import { service_links } from './dashboard-data';
import { navLink } from '../../../shared/model/nav-link.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  service_link!: navLink[];

  ngOnInit(): void {
    this.service_link = service_links
  }
}
