import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Budget } from '../budget-input/budget.model';
import { Expense } from '../expense/expense.model';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
      public snackBar: MatSnackBar) { }

  expenseList: Expense[] = [];

  addBudget(budget: Budget) {
    // TODO now save to local storage, later save to server database
    this.storage.set('budget', budget);
    this.getBudgetValue();
    this.notify('Budget added successfully!');
  }

  getBudgetNotify(): Budget | string {
    if (this.storage.get('budget') == null ) {
      // tslint:disable-next-line:prefer-const
      let message = 'No budget input yet';
      this.notify(message);
      return message;
    } else {
      // tslint:disable-next-line:prefer-const
      let message = 'Budget already in storage!';
      this.notify(message);
      return message;
    }
  }

  getBudgetValue(): number {
    const budget = this.getBudget();
    return (budget == null) ? null :  budget.amount;
  }

  getBudgetPeriod(): string {
    const budget = this.getBudget();
    return (budget == null) ? null :  budget.period;
  }

  getBudget(): Budget {
    if (this.storage.get('budget') == null ) {
      // tslint:disable-next-line:prefer-const
      return;
    } else {
      // tslint:disable-next-line:prefer-const
      let budget = JSON.parse(JSON.stringify(this.storage.get('budget')));
      return budget;
    }
  }

  addExpenseItem(item: Expense) {
    try {
      // tslint:disable-next-line:prefer-const
      let currentExpenseList = this.storage.get('expenseList') || [];
      currentExpenseList.push(item);

      this.storage.set('expenseList', currentExpenseList);
      this.notify('New item added');
    } catch (e) {
      console.error(e);
      this.notify(e);
    }
  }

  // Return in expense list
  getExpenseList(): Expense[] {
    const list = this.storage.get('expenseList') || [];
    console.log(list);
    return list;
  }

  notify(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /* TODO:
    - add func to edit
    - add func to sum by category
    - func to sum all
    - find by category
    - find by id
    - filter
  */
}
