import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// tobe deleted later when adding to server
import { StorageServiceModule } from 'angular-webstorage-service';

// services
import { UserService } from './services/user.service';

import {  MatInputModule, MatSelectModule, MatSnackBarModule,
          MatCardModule, MatButtonModule, MatDatepickerModule,
          MatToolbarModule, MatExpansionModule, MatPaginatorModule,
          MatTableModule, MatTooltipModule, MatProgressBarModule,
          MatNativeDateModule, MatIconModule
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
import { LoginComponent } from './user/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './user/register/register.component';
import { ExpenseReportComponent } from './expense/expense-report/expense-report.component';
import { ExpenseGraphComponent } from './expense/expense-graph/expense-graph.component';

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
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    ExpenseReportComponent,
    ExpenseGraphComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule, HttpModule, HttpClientModule,
    // Mat
    MatInputModule, MatSnackBarModule, MatPaginatorModule,
    MatCardModule, MatSelectModule, MatSortModule, MatTooltipModule,
    MatButtonModule, MatToolbarModule, MatExpansionModule, MatIconModule,
    MatDatepickerModule, MatNativeDateModule, MatTableModule,
    MatProgressBarModule,
    // temporary stuffs added here
    StorageServiceModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
