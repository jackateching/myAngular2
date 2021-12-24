import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/data-storage.service';
import {createRoomInterface} from '../../app-interface';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  createRoom!:FormGroup; 
  newRoomInfo!:createRoomInterface;

  constructor(private dataStorageService:DataStorageService, 
              private route: Router) { }

  ngOnInit(): void {
    this.createRoom = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'floor': new FormControl(null, Validators.required),
      'bathTub': new FormControl(null, Validators.required),
      'balcony': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    console.log(this.createRoom.value);
    this.newRoomInfo = {
      name: this.createRoom.value.name,
      floor: this.createRoom.value.floor,
      bathTub: this.createRoom.value.bathTub.toLowerCase() === "yes"? true: false,
      balcony:this.createRoom.value.balcony.toLowerCase() === "yes"? true: false,
      price:this.createRoom.value.price
    }
    // console.log(this.newRoomInfo);
    let res = this.dataStorageService.createNewRoom(this.newRoomInfo);  

    res.subscribe((data) => {
      console.log(data);
      this.route.navigate(['home']);
    }, error =>{
      console.log("error occured on creating room");
      this.route.navigate(['home']);
    });
  }
}
