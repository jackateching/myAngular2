import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../data-storage.service'
import {allRoomInterface} from '../../app-interface'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allRooms!:allRoomInterface[]

  constructor(private dataStorageService:DataStorageService, 
              private router:Router) { }

  ngOnInit(): void {
    this.dataStorageService.getAllRooms().subscribe(data => {
      this.allRooms = data;
    })
  }
  onEdit(id:string, name:string, floor:number, balcony:string, bathTub:string, roomState:string, price:number){
    this.router.navigate([`/edit-room/${id}/${name}/${floor}/${balcony}/${bathTub}/${price}`]);
  }
  onDelete(id:string){
    let res = this.dataStorageService.deleteRoom(id);
    res.subscribe(data =>{
      this.ngOnInit();
    }, 
    error =>{
      console.log("error occured on deleting room");
    })
  }
}
