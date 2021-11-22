import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
 
  constructor(private router: Router, private authService: AuthService) { }      
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
     if (this.isLoggedIn()) {      
        return true;      
     }      
    
    this.router.navigate(['/login']);      
    return false;      
  }      

  isLoggedIn(): boolean {      
    let status = false;  
    if (this.authService.sharedUserDetails$.userName){
      status = true;
    }    
    else {      
      status = false;      
    }      

    return status;      
  }    
}
