import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ExpenseService } from '../services/expense.service';
import { Budget } from '../budget-input/budget.model';

@Component({
  selector: 'app-budget-input',
  templateUrl: './budget-input.component.html',
  styleUrls: ['./budget-input.component.css']
})
export class BudgetInputComponent implements OnInit {
  constructor( private expenseService: ExpenseService ) { }

  // value = this.expenseService.getBudgetValue();
  // period = this.expenseService.getBudgetPeriod();
  value = this.expenseService.getBudgetValue();
  period = this.expenseService.getBudgetPeriod();
  message: any = null;

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    this.message = this.expenseService.getBudgetNotify();
  }

  onAddBudget(form: NgForm) {
    const id = ((new Date().getMonth() + 1).toString()) + ((new Date().getDate()).toString()) + form.value.period;
    if (form.invalid) {
      return;
    }
    const budget: Budget = { id: id, userId: 1, amount: form.value.amount, period: form.value.period, date: new Date()};
    this.expenseService.addBudget(budget);
    console.log(budget);

    this.message = this.expenseService.getBudgetValue();
    console.log(this.message);
    this.expenseService.budgetInput.next(this.expenseService.hasBudget());

  }
}
