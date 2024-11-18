import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, viewChildren } from '@angular/core';
import { BackupService } from './backup-list.service';
import { Backup } from '../../../shared/model/backup.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backup-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backup-list.component.html',
  styleUrl: './backup-list.component.scss',
  providers: [BackupService]
})
export class BackupListComponent implements OnInit{
  backupVolumes: Backup[] = []
  currentDate = new Date();
  innerHTML!: string;
  constructor(private backupService: BackupService) {}

  ngOnInit(): void {
      this.backupVolumes = this.backupService.allBackups;
  }

  copyName(copyName: HTMLTableCellElement){
    this.innerHTML = copyName.innerHTML;
    navigator.clipboard.writeText(this.innerHTML).then(()=>{
      console.log("Copied")
    }).catch(err=>console.log(err))
  }
}
