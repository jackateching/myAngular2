import { HttpHandler, HttpRequest } from "@angular/Common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { allRoomInterface } from "src/app/app-interface";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService{
    constructor(private authService:AuthService){}

    intercept(req: HttpRequest<any>, next:HttpHandler ){
        return this.authService.user.pipe(
            take(1),
            exhaustMap((user) => {
                console.log(user);
                if(!user){
                    console.log("user is null");
                    return next.handle(req);
                }
                // const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token as any)})
                const modifiedReq = req.clone({setHeaders: {"x-access-token": `${user.token}`}});
                return next.handle(modifiedReq);
            })
        )
    }
}
