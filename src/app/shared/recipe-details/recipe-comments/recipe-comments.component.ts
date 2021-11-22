import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CommentsDboModel } from 'src/app/models/comments-model';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-recipe-comments',
  templateUrl: './recipe-comments.component.html',
  styleUrls: ['./recipe-comments.component.css']
})
export class RecipeCommentsComponent implements OnInit {

  rating: number = 1;
  stars = Array;
  loggedInUser: UserModel = {} as UserModel;
  confirmAction: boolean = false;
  comment: CommentsDboModel = {} as CommentsDboModel;
  commentsArr: CommentsDboModel[] = [] as CommentsDboModel[];
  msgFormCtrl: FormControl = new FormControl();
  @Input() recipeId: string = "";

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: SnackbarComponent,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.sharedUserDetails$;
    this.getCommentsList();
  }

  onRatingUpdate(starRate: number) {
    this.rating = starRate;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onCommentPost() {
    this.initializeCommentObject();

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '320px',
      data: { userName: this.loggedInUser.userName, confirm: true }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.confirmAction = result;
        if (this.confirmAction == true) {
          this.addComment();
        } else {
          this.snackBar.openSimpleMessageSnackbar("Operatiunea a fost anulata");
        }
      });
  }

  addComment() {
    this.userService.postComment(this.comment).pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.msgFormCtrl.reset();
        this.rating = 1;
        this.getCommentsList();
        this.snackBar.openSimpleMessageSnackbar("Comentariul dvs. a fost adaugat")
      })
  }

  initializeCommentObject() {
    this.comment.userName = this.loggedInUser.userName;
    this.comment.currentDate = new Date();
    this.comment.message = this.msgFormCtrl.value;
    this.comment.rating = this.rating;
    this.comment.recipesId = this.recipeId;
  }

  getCommentsList() {
    this.userService.getComments(this.recipeId).pipe(takeUntil(this.destroy$))
      .subscribe((result: CommentsDboModel[]) => {
        this.commentsArr = result;
      })
  }
}
