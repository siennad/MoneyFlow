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

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    this.message = this.expenseService.getBudget();
  }

  // tslint:disable-next-line:member-ordering
  message: any = null;

  onAddBudget(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const budget: Budget = { amount: form.value.amount, period: form.value.period};
    this.expenseService.addBudget(budget);
  }
}
