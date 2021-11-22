import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/models/recipe-models';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() recipeDetails:RecipeModel={} as RecipeModel;
  @Input() recipeId:string="";
  user:UserModel={} as UserModel;

  constructor(private loggedInUser: AuthService) { }

  ngOnInit(): void {
    this.recipeId=this.recipeDetails.id;
    this.user=this.loggedInUser.sharedUserDetails$;
  }
}
