import { HttpClient, HttpErrorResponse } from '@angular/Common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { authRespondData } from '../../app-interface';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';

  private tokenExpirationTimer:any;

  user = new BehaviorSubject<User>({} as any);
  // user = new ReplaySubject<User>({} as any);

  constructor(private http: HttpClient,
              private router: Router
              ) {}

  signup(username: string, password: string, register:string): Observable<any> {
    return this.http
      .post<authRespondData>(this.apiUrl + register
        , {
        username: username,
        password: password,
        level:"employee"
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.username,
            resData._id,
            resData.token,
            120
          );
        })
      );
  }

  signin(username: string, password: string, login:string): Observable<any> {
    return this.http
      .post<authRespondData>(this.apiUrl + login, {
        username: username,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.username,
            resData._id,
            resData.token,
            120
          );
        })
      );
  }

  autoLogin(){
    // let userData:{
    //   id: string,
    //   username: string,
    //   _token: string,
    //   _tokenExpirationDate: Date
    // };
    let userData:any
    userData = localStorage.getItem('userData');

    userData = JSON.parse(userData!)

    if(!userData){
      return;
    }
    
    const loadedUser = new User(
      userData.id, 
      userData.username, 
      userData._token, 
      new Date(userData._tokenExpirationDate)
    );
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }


  logout(){
    this.user.next(null as any);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration:number){
    this.tokenExpirationTimer = setTimeout( ()=>{
      this.logout();
    }, expirationDuration)
  }

  private handleAuthentication(
    username: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(username, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Unknown error occured!';
    if (!errorRes) {
      return throwError(errorMessage);
    }
    return throwError(errorRes);
  }

  // getUsers(username:string, password:string){
  //   try{
  //     this.http.post<any>(this.apiUrl, {
  //       username: username,
  //       password: password
  //     }).subscribe(data => {console.log(data)});
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }

  // getUsers(username:string, password:string):Observable<any>{
  //     return this.http.post<any>(this.apiUrl, {
  //       username: username,
  //       password: password
  //     });
  // }
}
