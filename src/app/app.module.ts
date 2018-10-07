import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// tobe deleted later when adding to server
import { StorageServiceModule } from 'angular-webstorage-service';

import {  MatInputModule, MatSelectModule, MatSnackBarModule,
          MatCardModule, MatButtonModule,
          MatToolbarModule, MatExpansionModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetInputComponent } from './budget-input/budget-input.component';
import { ExpenseInputComponent } from './expense/expense-input/expense-input.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetInputComponent,
    ExpenseInputComponent,
    MainPageComponent,
    ExpenseListComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule, MatSnackBarModule,
    MatCardModule, MatSelectModule,
    MatButtonModule, MatToolbarModule, MatExpansionModule,
    // temporary stuffs added here
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
