import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { editedUser } from 'src/app/app-interface';
import { DataStorageService } from 'src/app/data-storage.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUser!: FormGroup

  editedUser!:editedUser
  constructor(private route: ActivatedRoute, 
              private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.editUser = new FormGroup({
      'username': new FormControl(this.route.snapshot.params['username']),
      'status': new FormControl(this.route.snapshot.params['status'], Validators.required),
      'level': new FormControl(this.route.snapshot.params['level'], Validators.required),
    })
  }
  onSubmit(){
    this.editedUser ={
      status: this.editUser.value.status,
      level: this.editUser.value.level
    }
    this.dataStorageService.updateUser(this.route.snapshot.params['id'], this.editedUser);
  }
}
