import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DtoRecipeModel, IngredientModel, RecipeModel } from '../models/recipe-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  constructor(private http: HttpClient) { }

  recipe = {} as RecipeModel;
  ingredients = {} as IngredientModel;
  dtoRecipe = {} as DtoRecipeModel;

  getIngredients(): Observable<IngredientModel> {
    return this.http.get<IngredientModel>('http://cookbook.ddns.net:5000/api/ingredients');
  }

  postRecipe(recipe: RecipeModel, username: string, password: string): Observable<string> {
    let params = new HttpParams().set("username", username)
      .set("password", password);

    return this.http.post<string>('http://cookbook.ddns.net:5000/api/post', recipe, { responseType: 'text' as 'json', params: params })
  }

  getDtoRecipes(dishType: number): Observable<DtoRecipeModel[]> {
    let params = new HttpParams().set("dishType", dishType);

    return this.http.get<DtoRecipeModel[]>('http://cookbook.ddns.net:5000/api/dtorecipe', { params: params });
  }

  getRecipe(id: any): Observable<RecipeModel> {
    let params = new HttpParams().set("id", id);

    return this.http.get<RecipeModel>('http://cookbook.ddns.net:5000/api/recipe', { params: params });
  }
}
