import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// tobe deleted later when adding to server
import { StorageServiceModule } from 'angular-webstorage-service';

import {  MatInputModule, MatSelectModule, MatSnackBarModule,
          MatCardModule, MatButtonModule, MatDatepickerModule,
          MatToolbarModule, MatExpansionModule, MatPaginatorModule,
          MatTableModule,
          MatNativeDateModule, MatHeaderRowDef,
          MatSortHeader, MatRow, MatRowDef,  MatCell, MatCellDef,
    } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetInputComponent } from './budget-input/budget-input.component';
import { ExpenseInputComponent } from './expense/expense-input/expense-input.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { ExpenseTrackingComponent } from './expense/expense-tracking/expense-tracking.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetInputComponent,
    ExpenseInputComponent,
    MainPageComponent,
    ExpenseListComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ExpenseTrackingComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    // Mat
    MatInputModule, MatSnackBarModule, MatPaginatorModule,
    MatCardModule, MatSelectModule, MatSortModule,
    MatButtonModule, MatToolbarModule, MatExpansionModule,
    MatDatepickerModule, MatNativeDateModule, MatTableModule,
    // temporary stuffs added here
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
