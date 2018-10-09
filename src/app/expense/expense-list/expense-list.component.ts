import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  constructor(public expenseService: ExpenseService) { }

  list;
  length;

  ngOnInit() {
    this.list = this.expenseService.getExpenseList();
    this.length = this.list.length;
  }

}
