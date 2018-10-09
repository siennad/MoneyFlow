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
    if (form.invalid) {
      return;
    }
    const budget: Budget = { amount: form.value.amount, period: form.value.period};
    this.expenseService.addBudget(budget);
    this.message = this.expenseService.getBudgetValue();
    console.log(this.message);
    this.expenseService.budgetInput.next(this.expenseService.hasBudget());
  }
}
