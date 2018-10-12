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
    this.listSub = this.expenseService.getListUpdateListener()
    .subscribe( (list: Expense[]) => {
      this.budgetTracking = this.expenseService.getBudgetRemain(list);
    });
  }

  date;
  listSub: Subscription;
  budgetTracking;
  timeTracking;
  expenselist;

  ngOnInit() {
    this.date = new Date();
    this.timeTracking = this.expenseService.getBudgetRemainDay();
    this.expenselist = this.expenseService.getExpenseList();
    this.budgetTracking = this.expenseService.getBudgetRemain(this.expenselist);
    console.log(this.timeTracking);
    console.log(this.budgetTracking);

  }

}
