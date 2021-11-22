import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { IngredientModel, IngredientRecipeModel, RecipeModel } from 'src/app/models/recipe-models';
import { RecipesService } from 'src/app/services/recipes.service';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { PostRecipeComponent } from './post-recipe/post-recipe.component';


@Component({
  selector: 'app-add-recipes',
  templateUrl: './add-recipes.component.html',
  styleUrls: ['./add-recipes.component.css']
})
export class AddRecipesComponent implements OnInit {

  constructor(private recipesService: RecipesService,
    private snackBar: SnackbarComponent,
    private matDialog: MatDialog,) { }

  recipeForm = new FormGroup({});
  options: FormlyFormOptions = {};
  recipeFormFields: FormlyFieldConfig[] = [];
  recipeModel = {} as RecipeModel;
  ingredientsList: any;
  quantitiesObjList: IngredientRecipeModel[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  search = "";
  filteredOptions: Observable<IngredientModel[]> | undefined;


  descriptionFormControl = new FormControl('', [
    Validators.required
  ]);
  instructionsFormControl = new FormControl('', [
    Validators.required
  ]);
  ingredientsFormControl = new FormControl();
  quantitiesFormControl = new FormControl('', [
    Validators.maxLength(10)
  ]);


  ngOnInit(): void {

    this.getAllIngredients();
    this.recipeForm.markAsUntouched;

    this.recipeFormFields = [
      {
        key: 'dishName',
        type: 'input',
        className: 'dish-style',
        templateOptions: {
          label: 'Nume preparat',
          placeholder: 'Ex. Limonada',
          required: true,
          maxLength: 50
        },
      },
      {
        key: 'dishType',
        type: 'select',
        className: 'dishType-style',
        templateOptions: {
          label: 'Tip preparat',
          placeholder: 'Alegeti tipul preparatului',
          required: true,
          options: [
            { value: 1, label: 'Aperitive' },
            { value: 2, label: 'Felul intai' },
            { value: 3, label: 'Felul principal' },
            { value: 4, label: 'Desert' },
            { value: 5, label: 'Smoothie & Drinks' }
          ],
        },
      },
      {
        key: 'preparationTime',
        type: 'input',
        templateOptions: {
          label: 'Timp de gatire (minute)',
          type: 'input',
          required: true,
          pattern: '([1-9]|[1-9][0-9]|[1-4][0-9][0-9])'
        }, validation: {
          messages: {
            pattern: (error, field: FormlyFieldConfig) => `Eroare! (introduceti doar valori intre 1-500)`,
          },
        },
      },
      {
        key: 'image',
        type: 'input',
        templateOptions: {
          label: 'Poza de prezentare',
          placeholder: 'Introduceti Url pentru poza de prezentare',
          required: true,
          maxLength: 50
        },
      }
    ];

    this.filteredOptions = this.ingredientsFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterIngredientsList(value))
      );
  }

  openPostConfirmationDialog() {
    this.recipeModel.instructions = this.instructionsFormControl.value;
    this.recipeModel.description = this.descriptionFormControl.value;

    this.matDialog.open(PostRecipeComponent, {
      width: '6000px',
      maxHeight: '90vh',
      data: this.recipeModel,
      autoFocus: true
    });
  }

  getAllIngredients() {
    this.recipesService.getIngredients().pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.ingredientsList = response;
    })
  }

  addIngredient() {
    let ingredientObj: IngredientRecipeModel = {
      name: this.ingredientsFormControl.value,
      quantity: this.quantitiesFormControl.value
    };

    if (ingredientObj.name === "" || ingredientObj.quantity === "") {
      this.snackBar.openSimpleMessageSnackbar('Operatiune esuata! Datele nu sunt completate');
      return;
    }
    if (this.quantitiesObjList.some(item => item.name === ingredientObj.name)) {
      this.snackBar.openSimpleMessageSnackbar('Acest ingredient a fost deja adaugat');
      return;
    }
    if (this.ingredientsList.some((item: { name: string; }) => item.name === ingredientObj.name)) {
      this.quantitiesObjList.push(ingredientObj);
    } else {
      this.snackBar.openSimpleMessageSnackbar('Ingredientul introdus nu exista in baza de date');
      return;
    }

    this.recipeModel.ingredientsQuantities = this.quantitiesObjList;
  }

  removeIngredient(ingredientToBeRemoved: string) {
    let copyOfQuantitiesObjList: IngredientRecipeModel[] = [];

    this.quantitiesObjList.forEach(element => {
      if (element.name !== ingredientToBeRemoved) {
        copyOfQuantitiesObjList.push(element);
      }
    });

    this.quantitiesObjList = copyOfQuantitiesObjList;
    this.recipeModel.ingredientsQuantities = this.quantitiesObjList;

    this.snackBar.openSimpleMessageSnackbar("Ingredientul a fost sters cu succes");
  }

  private filterIngredientsList(value: string): IngredientModel[] {
    const filterValue = value.toLowerCase();
    return this.ingredientsList.filter((option: { name: string; }) => option.name.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}