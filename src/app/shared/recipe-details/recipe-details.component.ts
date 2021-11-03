import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/models/recipe-models';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() recipeDetails:RecipeModel={} as RecipeModel;
  constructor() { }

  ngOnInit(): void {
    
  }
}
