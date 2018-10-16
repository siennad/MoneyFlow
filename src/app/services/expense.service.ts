import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Budget } from '../budget-input/budget.model';
import { Expense } from '../expense/expense.model';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../expense/category.model';
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
  public budget;

  addBudget(budget: Budget) {
    // TODO now save to local storage, later save to server database
    this.storage.set('budget', budget);
    this.getBudgetValue();
    this.notify('Budget added successfully!');

    // SUB subcription for changing
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
    return (budget == null) ? null :  budget.amount;
  }

  getBudgetPeriod(): string {
    const budget = this.getBudget();
    return (budget == null) ? null : budget.period;
  }

  getBudgetId(): string {
    const budget = this.getBudget();
    return (budget == null) ? null : budget.id;
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
    let days = (budget == null) ?
        null : this.differentBtwDate(new Date(), new Date(budget.date));
    let remainDays = 0;
    let message = '';
    if ( (days != null) ) {
      switch (period) {
        case 'oneWeek': {
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
        case 'twoWeek': {
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
        case 'oneMonth': {
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

  getBudgetRemain(list) {
    const budget = this.getBudget();
    const budgetAmount = this.getBudgetValue();
    let remainValue = 0;
    let message = '';

    if ( list == null ) {
      message = 'You haven\'t had any items yet!';
    }
    const sum = this.sum(list);

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
    return {remainValue: remainValue, message: message};
  }

  addExpenseItem(item: Expense) {
    console.log('add item');

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
    // SUB subcription for changing
    this.listUpdate.next([...this.expenseList]);

    // tslint:disable-next-line:prefer-const
    let currentExpenseList = this.storage.get('expenseList') || [];
    currentExpenseList.push(item);
    this.storage.set('expenseList', this.expenseList);
  }

  // Return in expense list
  getExpenseList() {

    this.expenseList = [];
    if (this.storage.get('expenseList') != null ) {
      // get data from local storage. change to server
      this.storage.get('expenseList').map( data => {
        this.expenseList.push(data);
      });
      // SUB subcription for changing
      this.listUpdate.next([...this.expenseList]);
      return [...this.expenseList];
    } else {
      return null;
    }
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
    - add func to sum by category (DONE)
    - func to sum (DONE)
    - find by category (DONE)
    - find by id
    - filter
  */

  /*
  * BELOW is math function to calculate for the list ExpenseList = Expense[]
  */

  sum(list) {
    const total = (list != null) ? list.length : 0;
    let totalSpend = 0;
    if (list != null) {
      list.forEach(element => {
        totalSpend += element.spend;
      });
    }
    const sum: {total: number; totalSpend: number} = {total: total, totalSpend: totalSpend};
    return  sum;
  }

  // get expense list by category:
  // return Expense[]
  getExpenseByCategory( cat: Category) {
    // tslint:disable-next-line:prefer-const
    let ExpenseByCat = [];
    const expenseList = this.getExpenseList();

    if (expenseList === null) {
      return null;
    }
    // tslint:disable-next-line:prefer-const
    for ( let item of expenseList) {
      // tslint:disable-next-line:no-unused-expression
      (item.category.name === cat.name) ? ExpenseByCat.push(item) : null;
    }

    // console.log(ExpenseByCat);

    return ExpenseByCat;
  }

  // get array of object expense value by category :
  // return [{category, ValueExpense}]
  divideExpenseByCategory() {
    // tslint:disable-next-line:prefer-const
    let ExpenseListByCat = [];
    const expenseList = this.getExpenseList();

    if (expenseList === null) {
      return null;
    }

    const listOfCategories = this.getCategoryListinList(expenseList);

    for (const cat of listOfCategories) {
      ExpenseListByCat.push(
        {
          category: cat,
          ValueExpense: this.sum(this.getExpenseByCategory(cat))
        }
      );
    }

    // console.log(ExpenseListByCat);

    return ExpenseListByCat;
  }

  // send: Expense[]
  // return: Category[]
  getCategoryListinList(list) {
    // tslint:disable-next-line:prefer-const
    let CategoryList = [];
    const expenseList = this.getExpenseList();

    if (expenseList === null) {
      return null;
    }

    for ( const item of expenseList ) {
      let catInit = false;
      for (const cat of CategoryList) {
        if (CategoryList.length !== 0) {
          if ( item.category.name ===  cat.name) {
            catInit = true;
          }
        }
      }
      if (catInit === false) {
        CategoryList.push(item.category);
      }
      catInit = false;
    }

    return CategoryList;
  }


}
