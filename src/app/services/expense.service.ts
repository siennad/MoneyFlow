import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Budget } from '../budget-input/budget.model';
import { Expense } from '../expense/expense.model';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
      public snackBar: MatSnackBar) { }

  expenseList: Expense[] = [];
  private listUpdate: Subject<Expense[]> = new Subject<Expense[]>() ;

  // below to anounce that budget has been inputted so that the expense form available
  public budgetInput: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasBudget());

  addBudget(budget: Budget) {
    // TODO now save to local storage, later save to server database
    this.storage.set('budget', budget);
    this.getBudgetValue();
    this.notify('Budget added successfully!');
    this.budgetInput.next(true);
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

  getBudgetValue() {
    const budget = this.getBudget();
    return (budget == null) ? null : budget.amount;
  }

  getBudgetPeriod(): string {
    const budget = this.getBudget();
    return (budget == null) ? null : budget.period;
  }

  getBudget(): Budget {
    if (this.storage.get('budget') == null ) {
      // tslint:disable-next-line:prefer-const
      return null;
    } else {
      // tslint:disable-next-line:prefer-const
      let budget = JSON.parse(JSON.stringify(this.storage.get('budget')));
      return budget;
    }
  }

  hasBudget(): boolean {
    return (this.getBudget() == null) ? false : true;
  }

  differentBtwDate( date1: Date, date2: Date) {
    let diff = 0;
    const mls1Day = 1000 * 60 * 60 * 24;
    diff = Math.round( (date1.getTime() - date2.getTime()) / mls1Day );
    return diff;
  }

  getBudgetRemainDay() {
    const budget = this.getBudget();
    const period = this.getBudgetPeriod();
    // tslint:disable-next-line:prefer-const
    let days = (period == null) ? null : this.differentBtwDate(new Date(), budget.date);
    let remainDays = 0;
    let message = '';
    if ( (days != null) ) {
      switch (period) {
        case 'OneWeek': {
          remainDays = 7 - days;
          if ( remainDays > 0 ) {
            message = 'You have ' + remainDays + ' days left.';
          } else if ( remainDays === 0) {
            message = 'Today is the last day';
          } else {
            message = 'You has ' + Math.abs(remainDays) + ' over the period of one week';
          }
          break;
        }
        case 'TwoWeek': {
          remainDays = 14 - days;
          if ( remainDays > 0 ) {
            message = 'You have ' + remainDays + ' days left.';
          } else if ( remainDays === 0) {
            message = 'Today is the last day';
          } else {
            message = 'You has ' + Math.abs(remainDays) + ' over the period of two weeks';
          }
          break;
        }
        case 'OneMonth': {
          remainDays = 30 - days;
          if ( remainDays > 0 ) {
            message = 'You have ' + remainDays + ' days left.';
          } else if ( remainDays === 0) {
            message = 'Today is the last day';
          } else {
            message = 'You has ' + Math.abs(remainDays) + ' over the period of one month';
          }
          break;
        }
        default:
          remainDays = 0;
          message = 'You haven\'t set your budget';
          break;
      }
    } else {
      message = 'You haven\'t set your budget';
    }

    return {remainDays: remainDays, message: message};
  }

  getBudgetRemain() {
    const budget = this.getBudget();
    const budgetAmount = this.getBudgetValue();
    const sum = this.sum(this.expenseList);
    let remainValue = 0;
    let message = '';

    if (budgetAmount === null) {
      message = 'You haven\'t set your budget value';
    } else {
      if (sum !== {total: 0, totalSpend: 0}) {
        remainValue = budgetAmount - sum.totalSpend;
        if (remainValue >= 0) {
          message = 'You have ' + sum.total + ' item(s) in list with total €'
          + sum.totalSpend + ' . You have remain €' + remainValue + '!';
        } else {
          message = 'You have ' + sum.total + ' item(s) in list with total €' + sum.totalSpend +
          ' . You have used €' + Math.abs(remainValue) + ' over!';
        }
      } else {
        message = 'You have 0 item in list';
      }
    }

  }

  addExpenseItem(item: Expense) {
    /* try {
      // local
      this.expenseList.push(item);
      this.listUpdate.next([...this.expenseList]);
      // tslint:disable-next-line:prefer-const
      let currentExpenseList = this.storage.get('expenseList') || [];
      currentExpenseList.push(item);
      this.storage.set('expenseList', currentExpenseList);
      this.notify('New item added');
    } catch (e) {
      console.error(e);
      this.notify(e);
    } */
    this.expenseList.push(item);
    this.listUpdate.next([...this.expenseList]);

    // tslint:disable-next-line:prefer-const
    let currentExpenseList = this.storage.get('expenseList') || [];
    currentExpenseList.push(item);
    this.storage.set('expenseList', currentExpenseList);

  }

  // Return in expense list
  getExpenseList() {
   this.storage.get('expenseList').map( data => {
      this.expenseList.push(data);
    });
    this.listUpdate.next([...this.expenseList]);
    return [...this.expenseList];
  }

  getListUpdateListener() {
    return this.listUpdate.asObservable();
  }

  notify(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /* TODO:
    - add func to edit
    - add func to sum by category
    - func to sum all done
    - find by category
    - find by id
    - filter
  */

  sum(list) {
    const total = list.length;
    let totalSpend = 0;
    list.forEach(element => {
      totalSpend += element.spend;
    });
    const sum: {total: number; totalSpend: number} = {total: total, totalSpend: totalSpend};
    return  sum;
  }

}
