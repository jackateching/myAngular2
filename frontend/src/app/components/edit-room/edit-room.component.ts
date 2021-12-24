import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/data-storage.service';
import { allRoomInterface, editedRoomInterface } from 'src/app/app-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  allRooms!:allRoomInterface[]
  
  editRoom!:FormGroup; 
  editedRoom!: editedRoomInterface;

  constructor(private dataStorageService:DataStorageService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editRoom = new FormGroup({
        'id':new FormControl(this.route.snapshot.params['id']),
        'name': new FormControl(this.route.snapshot.params['name'], Validators.required),
        'floor': new FormControl(this.route.snapshot.params['floor'], Validators.required),
        'bathTub': new FormControl(this.route.snapshot.params['bathTub'] === "true" ?"Yes":"No", Validators.required),
        'balcony': new FormControl(this.route.snapshot.params['balcony'] === "true" ?"Yes":"No", Validators.required),
        'price': new FormControl(this.route.snapshot.params['price'], Validators.required)
      })
      console.log(this.editRoom);
  }

  onSubmit(){
    this.editedRoom = {
      name: this.editRoom.value.name,
      floor: this.editRoom.value.floor,
      bathTub: this.editRoom.value.bathTub.toLowerCase() === "yes"? true: false,
      balcony:this.editRoom.value.balcony.toLowerCase() === "yes"? true: false,
      price:this.editRoom.value.price
    }

    this.dataStorageService.updateRoom(this.route.snapshot.params['id'], this.editedRoom)
  }

}
