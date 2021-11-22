import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app//services/auth.service'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserLogInObject, UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService,
    private userService: UserService) { }

  loginForm = new FormGroup({});
  userLogInObject = {} as UserLogInObject;
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginFailedMsg = false;
  userModel: UserModel = {} as UserModel;

  loginFields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Nume utilizator',
        placeholder: 'Introduceti numele utilizator: ',
        required: true,
        maxLength: 50
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Va rugam introduceti parola',
        placeholder: 'Introduceti parola: ',
        type: 'password',
        required: true,
        minLength: 6,
        maxLength: 32
      }
    }];

  ngOnInit(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onValidForm(){
    if (this.userLogInObject.username === this.userModel.userName) {
      this.authService.sharedUserDetails$ = this.userModel;

      this.router.navigate(['/home']);
    } else {
      this.loginFailedMsg = true;
      this.loginForm.reset();
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginFailedMsg = true;
      return;
    }
    else {
      this.userService.getUserDetails(this.userLogInObject.username, this.userLogInObject.password).pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          this.userModel = res;
          this.onValidForm();
        })
    }
  }
}
