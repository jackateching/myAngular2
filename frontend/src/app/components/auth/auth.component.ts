import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/data-storage.service';
import { allRoomInterface } from 'src/app/app-interface';
import { Observable } from 'rxjs';
import {authRespondData} from '../../app-interface'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authform!: FormGroup;
  allRooms!: allRoomInterface[];

  isLoading:boolean = false;
  isSignUpMode:boolean = true;
  error:string = "";


  constructor(private authService: AuthService,
              private dataStorageService: DataStorageService,
              private router:Router) { }

  ngOnInit(): void {
    this.authform = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required)
    })
  }

  onSwitchSignIn(){
    this.isSignUpMode = !this.isSignUpMode;
  }

  onSubmit(){
    if(!this.authform.valid){
      return;
    }
    const username = this.authform.value.username;
    const password = this.authform.value.password;

    let authRespondObs: Observable<authRespondData>;

    this.isLoading = true;
    if(this.isSignUpMode){
      authRespondObs = this.authService.signup(username, password, "register");
    }else{
      authRespondObs = this.authService.signin(username, password, "login");
      // authRespondObs.subscribe(
      //   data => {
      //     if(data !== null){
      //       let getRooms = this.dataStorageService.getAllRooms(data.token);
      //       getRooms.subscribe(allRooms =>{
      //         this.allRooms = allRooms
      //       })
      //       this.router.navigate(['/home']);
      //       this.isLoading = false;
      //       console.log("page redirect to home");
      //     }
      //   },
      //   errorMessage =>{
      //     this.error = errorMessage.message;
      //     this.isLoading = false;
      //   }
      // )
    }


    authRespondObs.subscribe(
      resData =>{
        if(resData !== null){
          if(this.isSignUpMode){
          }else{
            console.log("resData is null");
          }
          this.router.navigate(['/home']);
        }
        this.isLoading = false;
      },
      errorMessage =>{
        this.error = errorMessage.message;
        this.isLoading = false;
      }
    )
    this.authform.reset();
  }
}
