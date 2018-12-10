import { UserService } from './user.service';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Budget } from '../budget-input/budget.model';
import { Expense } from '../expense/expense.model';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { BehaviorSubject, Subject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user/user.model';
import { environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  
  domain = environment.domain; // '';
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              public snackBar: MatSnackBar,
              private userService: UserService,
              private http: HttpClient) {
        // subscribe the data budget after adding/updating
        this.sub = this.budgetUpdated.asObservable().subscribe( data => this.budget = data);
        this.sub = this.listUpdate.asObservable().subscribe(data =>  {
          this.expenseList = data;
        });
  }

  expenseList: any;
  private listUpdate: Subject<Expense[]> = new Subject<Expense[]>() ;

  // below to anounce that budget has been inputted so that the expense form available
  public budgetInput: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasBudget());
  public budgetUpdated: Subject<any> = new Subject();
  public budget;
  private sub: Subscription;

  getCurrentUserId() {
    return this.userService.userLog != null ? this.userService.userLog.id : null;
  }

  getBudgetNotify(): Budget | string {
    if (this.budget == null ) {
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

  hasBudget(): boolean {
    return (this.getBudget() == null) ? false : true;
  }

  updateBudget(budget: Budget, budgetId) {

    console.log("update budget");

    this.http.put(this.domain + '/api/update/budget/' + budgetId , {budget: budget}, httpOptions).subscribe(
      res => {
        console.log(localStorage.getItem('budget'));

        // console.log(res);
        localStorage.setItem('budget', JSON.stringify(res));
        console.log(localStorage.getItem('budget'));
        // SUB subscription for changing
        this.budgetUpdated.next(res);
        console.log(res);
        this.notify('Updated budget successfully!');
      },
      err => {
        this.notify('Cannot update budget!');
        console.log(err);
      }
    );
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

  getBudgetFromdb() {
    const userId = this.getCurrentUserId();

    this.http.get(this.domain + '/api/get/budgets/' + userId)
    .subscribe(
      (data) => {
      this.budgetUpdated.next(data);
      this.budgetInput.next(true);
      localStorage.setItem('budget', JSON.stringify(data));
    },
    (err) => {
      console.error(err);
      if (localStorage.getItem('budget') == null ) {
        this.budget = null;
      } else {
        this.budget = JSON.parse(localStorage.getItem('budget'));
      }
    });

  }

  getBudget(): any {
    if (!this.getCurrentUserId()) {
      console.log('usr not login from budget');
      return;
    }
    // check local var first, if not, check for localstorage, then db
    if (! this.budget) {
      console.log('no budget atm');
      if (localStorage.getItem('budget') != null) {
        console.log('budget from storage');
        this.budget = JSON.parse(localStorage.getItem('budget'));
      } else {
        console.log('budget from db');
        this.budget = this.getBudgetFromdb();
      }
    }
    return this.budget;
  }

  addBudget(budget: Budget) {
    console.log("add budget");
    // TODO now save to local storage, later save to server database
    this.http.post<Budget>(this.domain + '/api/add/budget/', {budget: budget, userid: this.getCurrentUserId}, httpOptions).subscribe(
      res => {
        localStorage.setItem('budget', JSON.stringify(res));
        this.notify('Budget added successfully!');
        // SUB subscription for changing
        this.budgetInput.next(true);
        this.budgetUpdated.next(res);
        console.log(res);
      },
      err => {
        console.log(err);
        this.notify('Cannot add budget!');
      }
    );
  }

  differentBtwDate( date1: Date, date2: Date) {
    let diff = 0;
    const mls1Day = 1000 * 60 * 60 * 24;
    diff = Math.round( (date1.getTime() - date2.getTime()) / mls1Day );
    return diff;
  }

  addExpenseItem(item: Expense) {
    this.expenseList = this.getExpenseList();
    // get from local storage and then save to var
    // this.expenseList = this.getExpenseList();
    this.http.post<Expense>(this.domain + '/api/add/expense', {expenseitem: item, budgetid: this.getBudgetId()})
      .subscribe(
        (res) => {
          console.log(res);
          // save to file session
          this.expenseList.push(res);
          this.listUpdate.next([...this.expenseList]);
          // save to localStorage
          localStorage.setItem('expenseList', JSON.stringify(this.expenseList));
        },
        (err) => {
          console.log(err);
        }
      );
  }

  // Return in expense list
  getExpenseListFromdb() {
    this.http.get( this.domain + '/api/get/expense/'+ this.getBudgetId())
      .subscribe(
        (res) => {
          this.expenseList = res;
          this.listUpdate.next([...this.expenseList]);
          localStorage.setItem('expenseList', JSON.stringify(this.expenseList));
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getExpenseList() {
    if (!this.getBudgetId()) {
      console.log('usr not login from exp list');
      return;
    }

    if (!this.expenseList) {
      console.log('no expense list atm');

      if (localStorage.getItem('expenseList') != null) {
        console.log('exp list in storage');
        this.expenseList = JSON.parse( localStorage.getItem('expenseList') );
      } else {
        console.log('no list from storage. get from db');
        this.getExpenseListFromdb();
      }
    }
    return this.expenseList;
  }

  deleteItem(itemId) {
    // return null;
    this.http.delete(this.domain + '/api/delete/item' +  itemId)
    .subscribe( (res) => {
      console.log(res);
     /* if (res.success) {
        let i = this.expenseList.indexOf(res.item);
        if (i > -1 ) {
          this.expenseList.splice(i, 1);
        }
        this.listUpdate.next([...this.expenseList]);
        localStorage.setItem('expenseList', JSON.stringify(this.expenseList));
      } */
    }, (err) => {
      console.log(err)
    });
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
  getExpenseByCategory( cat ) {
    if (!this.getExpenseList()) {
      return null;
    }
    const expenseList = this.getExpenseList();
    const ExpenseByCat = [];
    for ( const item of expenseList) {
      // tslint:disable-next-line:no-unused-expression
      (item.category === cat) ? ExpenseByCat.push(item) : null;
    }
    return ExpenseByCat;
  }

  // get array of object expense value by category :
  // return [{category: val, ValueExpense : {total: val, totalSpend: val}}]
  divideExpenseByCategory() {
    // tslint:disable-next-line:prefer-const
    let ExpenseListByCat = [];
    const expenseList = this.getExpenseList();

    if (!expenseList) {
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
          if ( item.category ===  cat) {
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
