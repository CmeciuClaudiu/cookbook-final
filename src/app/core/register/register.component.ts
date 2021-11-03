import { Component, OnInit } from '@angular/core'
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserModel, UserPasword } from 'src/app/models/user-model';
import { FormGroup } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable, Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { map, takeUntil } from 'rxjs/operators';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
      breakpointObserver: BreakpointObserver, 
      private userService: UserService,
      private snackBar: SnackbarComponent,
      private router:Router) {

    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit(): void {

  }

  form = new FormGroup({});
  passwordForm = new FormGroup({});
  model ={} as UserModel;
  pwdObject ={} as UserPasword;
  destroy$: Subject<boolean>=new Subject<boolean>();
  invalidUsername:string="This username already exists!";

  fields: FormlyFieldConfig[] = [
    {
      key: 'userName',
      type: 'input',
      templateOptions: {
        label: 'Nume utilizator',
        placeholder: 'Introduceti numele utilizator: ',
        required: true,
        maxLength:50
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Adresa de email',
        placeholder: 'Introduceti adresa de email: ',
        pattern: "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
        required: true,
        maxLength:50
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `Adresa de email invalida`,
        },
    },
  }];

  passwordFields: FormlyFieldConfig[]=[{
    validators: {
      validation: [
        { name: 'fieldMatch', options: { errorPath: 'passwordChck' } },
      ],
    },
    fieldGroup:[
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          label: 'Va rugam alegeti o parola',
          placeholder: 'Introduceti parola: ',
          type: 'password',
          required: true,
          minLength: 6,
        }
      },
      {
        key: 'passwordChck',
        type: 'input',
        templateOptions: {
          label: 'Reintroduceti parola',
          placeholder: 'Introduceti parola: ',
          type: 'password',
          required: true,
          minLength: 6,
        }, 
      },
    ],
  }];

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    this.model.userRole=2;
    this.model.password=this.pwdObject.password;
    this.userService.userPost(this.model).pipe(takeUntil(this.destroy$)).subscribe(res=>{
      this.snackBar.openSimpleMessageSnackbar(res.userName);
      if ((res.userName !== this.invalidUsername)){
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000); 
      }
    });
  }
}



