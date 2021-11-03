import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { HomePageComponent } from './home-page/home-page.component';
import { AppetizersPageComponent } from './appetizers-page/appetizers-page.component';
import { FirstCoursePageComponent } from './first-course-page/first-course-page.component';
import { MainCoursePageComponent } from './main-course-page/main-course-page.component';
import { DessertsPageComponent } from './desserts-page/desserts-page.component';
import { BeveragesPageComponent } from './beverages-page/beverages-page.component';
import { UserDetailsComponent } from './home-page/user-details/user-details.component';
import { UsersListComponent } from './home-page/users-list/users-list.component';
import { AddRecipesComponent } from './home-page/add-recipes/add-recipes.component';
import { fieldMatchValidator } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PostRecipeComponent } from './home-page/add-recipes/post-recipe/post-recipe.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomePageComponent,
    AppetizersPageComponent,
    FirstCoursePageComponent,
    MainCoursePageComponent,
    DessertsPageComponent,
    BeveragesPageComponent,
    UserDetailsComponent,
    UsersListComponent,
    AddRecipesComponent,
    PostRecipeComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'fieldMatch', validation: fieldMatchValidator },
      ],
      validationMessages: [
        { name: 'required', message: 'Acest camp nu poate fi gol' },
        { name: 'minlength', message: 'Parola trebuie sa contina minim 6 caractere'},
        { name: 'maxlength', message: 'Acest camp nu poate sa depaseasca 50 de caractere'}
      ],
    }),
    FormlyMaterialModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTooltipModule,
    SharedModule
  ],
  exports: [
    HomePageComponent,
    AppetizersPageComponent,
    FirstCoursePageComponent,
    MainCoursePageComponent,
    DessertsPageComponent,
    BeveragesPageComponent
  ]
})
export class PagesModule { }
