import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DtoRecipeModel, IngredientRecipeModel, RecipeModel } from 'src/app/models/recipe-models';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-first-course-page',
  templateUrl: './first-course-page.component.html',
  styleUrls: ['./first-course-page.component.css']
})
export class FirstCoursePageComponent implements OnInit {

  constructor(private recipeService:RecipesService) { }

  recipesListDto:DtoRecipeModel[]=[] as DtoRecipeModel[];
  recipeDetails:RecipeModel={} as RecipeModel;
  recipeIngredients: IngredientRecipeModel[]=[] as IngredientRecipeModel[];

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    const dishType=2;

    this.recipeService.getDtoRecipes(dishType).pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.recipesListDto=result
    });
    
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getRecipeDetails(id:string){
    this.recipeService.getRecipe(id).pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.recipeDetails=result;
    })
  }

}
