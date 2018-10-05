import { Inject, Injectable } from '@angular/core';
import { Budget } from '../budget-input/budget.model';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  addBudget(budget: Budget) {
    // TODO now save to local storage, later save to server database
    this.storage.set('budget', budget);
    this.getBudget();
  }

  getBudget() {
    if (this.storage.get('budget') == null ) {
      // tslint:disable-next-line:prefer-const
      let message = 'No budget input yet';
      return message;
    } else {
      // tslint:disable-next-line:prefer-const
      let budget = JSON.parse(JSON.stringify(this.storage.get('budget')));
      const amount = budget.amount;
      // console.log(typeof(budget));
      // console.log(amount);
      return amount;
    }

  }
}
