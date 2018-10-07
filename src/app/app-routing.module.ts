import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetInputComponent } from './budget-input/budget-input.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
