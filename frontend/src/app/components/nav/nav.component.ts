import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !user ? false : true;
      // this.isAuthenticated = !!user;
    });
  }

  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

}
