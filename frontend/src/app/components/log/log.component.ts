import { Component, OnInit } from '@angular/core';
import { logRespondData } from 'src/app/app-interface';
import { DataStorageService } from 'src/app/data-storage.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  isLoading = false;
  logs:any
  page = 1;
  itemsPerPage = 5;
  totalItems : any; 

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.dataStorageService.getLogs(this.page).subscribe((resDate)=>{
      this.logs = resDate.logs;
      this.page = resDate.page;
      this.totalItems = resDate.totalItems;
      this.isLoading = false;
    })
  }
  gty(page:any){
    this.isLoading = true;
    this.dataStorageService.getLogs(this.page).subscribe((resDate)=>{
      this.logs = resDate.logs;
      this.page = resDate.page;
      this.totalItems = resDate.totalItems;
      this.isLoading = false;
    })
  }
  
}
