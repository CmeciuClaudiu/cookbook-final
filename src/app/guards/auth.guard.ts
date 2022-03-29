import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
 
  constructor(private router: Router, private authService: AuthService) { }      
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
     if (this.authService.sharedUserDetails$.userName) {      
        return true;      
     }      
    
    this.router.navigate(['/login']);      
    return false;      
  }      
}
