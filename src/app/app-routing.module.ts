import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppetizersPageComponent } from './pages/appetizers-page/appetizers-page.component';
import { BeveragesPageComponent } from './pages/beverages-page/beverages-page.component';
import { DessertsPageComponent } from './pages/desserts-page/desserts-page.component';
import { FirstCoursePageComponent } from './pages/first-course-page/first-course-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainCoursePageComponent } from './pages/main-course-page/main-course-page.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { AuthGuard } from './guards/auth.guard';  

const routes: Routes = [
  { path: 'home', component: HomePageComponent, canActivate : [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'appetizers', component: AppetizersPageComponent },
  { path: 'first-course', component: FirstCoursePageComponent },
  { path: 'main-course', component: MainCoursePageComponent },
  { path: 'desserts', component: DessertsPageComponent },
  { path: 'beverages', component: BeveragesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
