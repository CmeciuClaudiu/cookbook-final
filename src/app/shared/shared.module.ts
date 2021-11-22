import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { MatCardModule } from '@angular/material/card';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { RecipeCommentsComponent } from './recipe-details/recipe-comments/recipe-comments.component';
import { MatDividerModule } from '@angular/material/divider';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [SnackbarComponent, DialogComponent, RecipesListComponent, RecipeDetailsComponent, RecipeCommentsComponent, RatingComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [
    SnackbarComponent,
    DialogComponent,
    RecipesListComponent,
    RecipeDetailsComponent
  ]
})
export class SharedModule { }
