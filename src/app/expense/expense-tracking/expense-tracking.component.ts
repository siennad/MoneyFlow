import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../expense.model';

@Component({
  selector: 'app-expense-tracking',
  templateUrl: './expense-tracking.component.html',
  styleUrls: ['./expense-tracking.component.css']
})
export class ExpenseTrackingComponent implements OnInit {

  constructor( private expenseService: ExpenseService) {
    // SUB subcription for changing
    this.listSub = this.expenseService.getListUpdateListener()
    .subscribe( (list: Expense[]) => {
      this.budgetTracking = this.expenseService.getBudgetRemain(list);
    });

    this.expenseService.budgetInput.subscribe(value => {
      this.timeTracking = this.expenseService.getBudgetRemainDay();
      this.budgetTracking = this.expenseService.getBudgetRemain(this.expenselist);
    });

    // ENDSUB

    this.categorize = this.expenseService.divideExpenseByCategory();
  }

  categorize;
  date;
  listSub: Subscription;
  budgetTracking;
  timeTracking;
  expenselist;

  ngOnInit() {
    this.date = new Date();
    this.expenselist = this.expenseService.getExpenseList();
    console.log(this.categorize);

  }

}
