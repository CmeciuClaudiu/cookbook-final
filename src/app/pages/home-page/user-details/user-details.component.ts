import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserModel } from 'src/app/models/user-model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private userService: UserService,
    private snackBar: SnackbarComponent,
    private authService: AuthService) { }

  editUserForm = new FormGroup({});
  editUserFields: FormlyFieldConfig[] = [];
  user = {} as UserModel;
  loggedInUser = this.authService.sharedUserDetails$;
  password: string = "";
  role: number = 0;
  formStatus = true;

  validationMsg: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.validationMsg = false;
    this.user.userName = this.loggedInUser.userName;
    this.user.email = this.loggedInUser.email;
    this.role = this.loggedInUser.userRole;
    this.user.password = "defaultPass";

    this.editUserFields = [
      {
        key: 'userName',
        type: 'input',
        defaultValue: 'default',
        templateOptions: {
          label: 'Nume utilizator',
          placeholder: 'Introduceti numele utilizator: ',
          required: true,
          maxLength: 50
        }
      },
      {
        key: 'email',
        type: 'input',
        defaultValue: 'default',
        templateOptions: {
          label: 'Adresa de email',
          placeholder: 'Introduceti adresa de email: ',
          pattern: "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
          maxLength: 50,
          required: true,
        },
        validation: {
          messages: {
            pattern: (error, field: FormlyFieldConfig) => `Adresa de email invalida`,
          },
        },
      }];

  }

  ngAfterViewInit() {
    if (this.user.userName != this.loggedInUser.userName) {
      this.formStatus = true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '320px',
      data: { userName: this.loggedInUser.userName, password: this.password }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.password = result;
        this.onEditUser();
      });
  }

  onEditUser() {
    if (this.editUserForm.invalid) {
      this.validationMsg = true;
      return;
    }

    if ((this.user.email !== this.loggedInUser.email) || (this.user.userName !== this.loggedInUser.userName)) {
      this.editUserInDb();
      return;
    } else {
      this.validationMsg = true;
      return;
    }
  }

  onCancel() {
    if (this.editUserForm.dirty) {
      this.user.userName = this.loggedInUser.userName;
      this.user.email = this.loggedInUser.email;
      this.validationMsg = false;
      this.editUserForm.reset(this.user);
      this.snackBar.openSimpleMessageSnackbar('Schimbarile au fost anulate');
    } else {
      this.snackBar.openSimpleMessageSnackbar('Nu au fost facute schimbari');
    }
  }

  editUserInDb() {
    this.validationMsg = false;
    this.user.id = this.loggedInUser.id;
    this.user.userRole = this.loggedInUser.userRole;

    this.userService.editUser(this.user, this.loggedInUser.userName, this.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (res.userName != null) {
          this.user = res;
          this.user.password = "defaultPassword";
          this.authService.sharedUserDetails$.userName = this.user.userName;
          this.authService.sharedUserDetails$.email = this.user.email;
          this.snackBar.openSimpleMessageSnackbar('Datele au fost salvate cu succes');
        } else {
          if (res.userRole == -1)
            this.snackBar.openSimpleMessageSnackbar('Exista deja un utilizator cu acest nume');
          else
            this.snackBar.openSimpleMessageSnackbar('Parola a fost introdusa gresit');
          return;
        }
      })
  }
}
