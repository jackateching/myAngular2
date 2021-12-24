import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/Common/http';
import { Observable } from 'rxjs';
import { createRoomInterface, editedRoomInterface, editedUser, usersRespondData } from './app-interface';
import { allRoomInterface } from '../app/app-interface';
import { AuthService } from './components/auth/auth.service';
import { logRespondData } from './app-interface';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { exhaustMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, 
              private authService: AuthService
              ) {}

  createNewRoom(newRoomInfo: createRoomInterface):Observable<createRoomInterface> {
    return this.http.post<createRoomInterface>(this.apiUrl + "createroom", newRoomInfo )
  }

  // createNewRoom(roomName:string, floor:number, bathTub:boolean,
  //   balcony:boolean, roomState:string, price:number):Observable<any>{
  //     return this.http.post<any>(this.apiUrl, {
  //       roomName: roomName,
  //       floor: floor,
  //       bathTub:bathTub,
  //       balcony:balcony,
  //       roomState: roomState,
  //       price:price
  //     })
  //   }

  getAllRooms(): Observable<allRoomInterface[]> {
    this.apiUrl = 'http://localhost:3000/';
    console.log(this.authService.user);
    return this.http.get<allRoomInterface[]>(this.apiUrl + "rooms");
  }
  
  // getLogs():Observable<logRespondData>{
  //   return this.http.get<logRespondData>(this.apiUrl + "logs" )
  // }
  getLogs(page:number):Observable<logRespondData>{
    return this.http.get<logRespondData>(`${this.apiUrl}logs?page=${page}`)
  }

  updateRoom(id:string, newRoomInfo:editedRoomInterface){
    this.http.put<editedRoomInterface>(this.apiUrl + "rooms/" + id, newRoomInfo).subscribe(data =>{
      console.log(data)
    }, error =>{
      console.log("error occured on updating room");
    })
  }
  deleteRoom(id:string){
    return this.http.delete<editedRoomInterface>(this.apiUrl + "rooms/" + id)
  }

  //Users

  getUsers():Observable<usersRespondData[]>{
    return this.http.get<any>(this.apiUrl + "users");
  }

  updateUser(id:string, editedUserInfo:editedUser){
    this.http.put<editedUser>(this.apiUrl + "users/" + id, editedUserInfo).subscribe(data =>{
      console.log(data);
    },
    error =>{
      console.log("error occured on updating user");
    });
  }

  deleteUser(id:string){
    this.http.delete<any>(this.apiUrl + "users/" + id).subscribe(data =>{
      // console.log(data)
    },
    error =>{
      console.log("error occured on deleting user");
    });
  }
}
