import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackupService } from './backup-list.service';
import { Backup } from '../../../shared/model/backup.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-backup-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backup-list.component.html',
  styleUrl: './backup-list.component.scss',
  providers: [BackupService]
})
export class BackupListComponent implements OnInit, OnDestroy{
  backupVolumes: Backup[] = []
  currentDate = new Date();
  innerHTML!: string;
  backupVolumesSubscription!: Subscription;
  constructor(private backupService: BackupService) {}

  ngOnInit(): void {
      this.backupVolumesSubscription = this.backupService.allBackups().subscribe((volumes)=>{
        this.backupVolumes = volumes;
      });
  }

  ngOnDestroy(): void {
    this.backupVolumesSubscription.unsubscribe();
  }

  copyName(copyName: HTMLTableCellElement){
    this.innerHTML = copyName.innerHTML;
    navigator.clipboard.writeText(this.innerHTML).then(()=>{
      console.log("Copied")
    }).catch(err=>console.log(err))
  }
  onReset() {

  }
}
