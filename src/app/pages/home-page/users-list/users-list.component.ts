import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Nume', 'Rol', 'Stergeti'];
  usersList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();


  user: UserModel = {} as UserModel;
  loggedInUser: UserModel = {} as UserModel;
  password = '';
  confirmDeletion: boolean = false;

  dataSource!: MatTableDataSource<UserModel>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private userService: UserService,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: SnackbarComponent) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.sharedUserDetails$;

    if (this.loggedInUser.password === null) {
      this.openDialog();
    } else {
      this.onGetUserList();
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
        this.loggedInUser.password = result;
        this.onGetUserList();
      });
  }

  onGetUserList() {
    this.userService.getUserList(this.loggedInUser.userName, this.loggedInUser.password).pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result.length != 0) {
          this.onFetchData(result);
        } else {
          this.snackBar.openSimpleMessageSnackbar("Parola gresita! reincercati")
          this.openDialog();
        }
      });
  }

  onFetchData(result: any) {
    let count = 1;
    this.usersList = result;
    this.usersList.forEach((element: any) => {
      element.id = count++;
    });
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
  }

  onDelete(username: string) {
    this.userService.deleteUser(username, this.loggedInUser.userName, this.loggedInUser.password).pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.snackBar.openSimpleMessageSnackbar('The user ' + result)
        this.onGetUserList();
      });
  }

  onDeleteValidation(username: string, role: number) {
    if (username == this.loggedInUser.userName) {
      this.snackBar.openSimpleMessageSnackbar("Nu va puteti sterge propriul cont");
    } else if (role == 1) {
      this.snackBar.openSimpleMessageSnackbar("Nu puteti sterge un administrator");
    } else {
      this.openConfirmationDialog(username);
    }
  }

  openConfirmationDialog(username: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '320px',
      data: { userName: this.loggedInUser.userName, confirm: this.confirmDeletion }
    });


    dialogRef.afterClosed().pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.confirmDeletion = result;
        if (this.confirmDeletion == true) {
          this.onDelete(username);
        } else {
          this.snackBar.openSimpleMessageSnackbar("Operatiunea a fost anulata");
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
