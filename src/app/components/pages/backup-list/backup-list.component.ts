import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackupService } from './backup-list.service';
import { Backup } from '../../../shared/model/backup.model';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from "../../../shared/components/search/search.component";
import { searchService } from '../../../shared/components/search/search.service';

@Component({
  selector: 'app-backup-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchComponent],
  templateUrl: './backup-list.component.html',
  styleUrl: './backup-list.component.scss',
  providers: [BackupService]
})
export class BackupListComponent implements OnInit, OnDestroy{


  backupVolumes: Backup[] = []
  currentDate = new Date();
  innerHTML!: string;
  backupVolumesSubscription!: Subscription;
  searchTerm: FormControl = new FormControl();
  days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  today!: string;
  
  constructor(private backupService: BackupService, private searchService: searchService) {}

  ngOnInit(): void {
      this.backupVolumesSubscription = this.backupService.allBackups().subscribe((volumes)=>{
        this.backupVolumes = volumes;
      });
      this.today = this.days[this.currentDate.getDay()];
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

  searchRequestSubscriptions: Subscription[] = [];

  onTextChange(changedText: string) {
    this.cancelPendingRequests();
    this.searchService.search(changedText).subscribe((resp)=>{
      this.backupVolumes = resp;
    })

  }

  cancelPendingRequests() {
    this.searchRequestSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
