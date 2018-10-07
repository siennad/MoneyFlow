import { Component, OnInit } from '@angular/core';
import { CATEGORIES } from '../../mock/CATEGORIES';
import { NgForm } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../expense.model';

@Component({
  selector: 'app-expense-input',
  templateUrl: './expense-input.component.html',
  styleUrls: ['./expense-input.component.css']
})
export class ExpenseInputComponent implements OnInit {

  constructor( private expenseService: ExpenseService ) { }
  info: any = null;
  categories = null;

  ngOnInit() {
    this.categories = CATEGORIES;
  }

  // TODO add by date (auto generated)
  addItem(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // @ts-ignore
    // tslint:disable-next-line:prefer-const
    let ID = '_' + Math.random().toString(36).substr(2, 9);
    const expense: Expense = {id: ID, name: form.value.name,
      spend: form.value.spend, category: form.value.category };
    this.expenseService.addExpenseItem( expense );
    this.info = { name: form.value.name,
      spend: form.value.spend, category: form.value.category };
    form.resetForm();
  }

}
