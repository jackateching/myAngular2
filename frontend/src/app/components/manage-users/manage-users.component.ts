import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usersRespondData } from 'src/app/app-interface';
import { DataStorageService } from 'src/app/data-storage.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  allUsers!:usersRespondData[]
  unAuthorize:boolean = false

  constructor(private dataStorageService: DataStorageService, 
              private route: Router) { }

  ngOnInit(): void {
    this.dataStorageService.getUsers().subscribe(data =>{
      this.unAuthorize = false;
      this.allUsers = data;
    }, 
    error =>{
      if(error.error === "Unauthorized!"){
        this.unAuthorize = true;
        console.log("this.unAuthorize = true")
      }
    })
  }

  onEdit(id: string, username:string, status:string, level:string){
    this.route.navigate([`edit-user/${id}/${username}/${status}/${level}`]);
  }
  onDelete(id:string){
    this.dataStorageService.deleteUser(id);
    this.ngOnInit();
  }
}
