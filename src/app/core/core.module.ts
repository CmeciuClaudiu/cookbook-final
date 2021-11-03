import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '../shared/shared.module';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { MatTooltipModule } from '@angular/material/tooltip'

export function fieldMatchValidator(control: AbstractControl) {
  const { password, passwordChck } = control.value;
  if (!passwordChck || !password) {
    return null;
  }

  if (passwordChck === password) {
    return null;
  }

  return { fieldMatch: { message: 'Parolele nu sunt identice' } };
}

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'fieldMatch', validation: fieldMatchValidator }
      ],
      validationMessages: [
        { name: 'required', message: 'Acest camp nu poate fi gol' },
        { name: 'minlength', message: 'Parola trebuie sa contina minim 6 caractere'},
        { name: 'maxlength', message: 'Acest camp nu poate sa depaseasca 50 de caractere'}
      ]
    }),
    FormlyMaterialModule,
    MatStepperModule,
    SharedModule,
    MatTooltipModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CommonModule
  ],
  providers: [
    SnackbarComponent
  ]
})
export class CoreModule { }
