import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RecipeModel } from 'src/app/models/recipe-models';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-post-recipe',
  templateUrl: './post-recipe.component.html',
  styleUrls: ['./post-recipe.component.css']
})
export class PostRecipeComponent implements OnInit {

  allowEdit: boolean=false;
  allowInstructionsEdit:boolean=false;

  dishNameCtrl=new FormControl('', [
    Validators.required,
    Validators.maxLength(50)
  ]);

  prepTimeCtrl=new FormControl('', [
    Validators.required,
    Validators.pattern('([1-9]|[1-9][0-9]|[1-4][0-9][0-9])')
  ]);

  imageUrlCtrl=new FormControl('', [
    Validators.required,
    Validators.maxLength(50)
  ]);

  descriptionFormControl = new FormControl('', [
    Validators.required
  ]);
  instructionsFormControl = new FormControl('', [
    Validators.required
  ]);

  userPasswordFormControl= new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  dishTypeCtrl=new FormControl('');
  loggedInUser: UserModel={} as UserModel;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject(MAT_DIALOG_DATA) public dbRecipeObject:RecipeModel,
               private dialogRef: MatDialogRef<PostRecipeComponent>,
               private snackBar:SnackbarComponent,
               private recipeService:RecipesService,
               private authService:AuthService) { 
    
  }

  onDestroy(){

  }

  ngOnInit(): void {
    this.loggedInUser=this.authService.sharedUserDetails$;
    this.descriptionFormControl.setValue(this.dbRecipeObject.description);
    this.instructionsFormControl.setValue(this.dbRecipeObject.instructions);
    this.dishNameCtrl.setValue(this.dbRecipeObject.dishName);
    this.prepTimeCtrl.setValue(this.dbRecipeObject.preparationTime);
    this.imageUrlCtrl.setValue(this.dbRecipeObject.image);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onBasicInfoSave(){
    this.dbRecipeObject.dishName=this.dishNameCtrl.value;
    this.dbRecipeObject.preparationTime=this.prepTimeCtrl.value;
    this.dbRecipeObject.image=this.imageUrlCtrl.value;
    this.dbRecipeObject.dishType=this.dishTypeCtrl.value;
    this.allowEdit=false;
  }

  onInstructionsSave(){
    this.dbRecipeObject.instructions=this.instructionsFormControl.value;
    this.dbRecipeObject.description=this.descriptionFormControl.value;
    this.allowInstructionsEdit=false;
  }

  onRecipePost(){
    this.recipeService.postRecipe(this.dbRecipeObject, this.loggedInUser.userName, this.userPasswordFormControl.value)
                      .pipe(takeUntil(this.destroy$))
                      .subscribe(result=>{
                          this.snackBar.openSimpleMessageSnackbar(result);
                          this.dialogRef.close();
                        })
  }

  onComponentClose(){
    this.snackBar.openSimpleMessageSnackbar("Operatiunea a fost anulata");
    this.dialogRef.close();
  }
}
