import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserModel } from '../models/user-model';
import { Router  } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router:Router) {  
    
    this.router.events.pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
                      .subscribe(event => {
                                  if(
                                      event.id === 1 &&
                                      event.url === event.urlAfterRedirects 
                                    ) {
                                        this.logout();
                                        router.navigate(['/login']);
                                      }
                                  })
   }
  
  sharedUserDetails$ = {} as UserModel;
  
  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
  }    
}
