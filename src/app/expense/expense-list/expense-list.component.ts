import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Expense } from '../expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  constructor(public expenseService: ExpenseService) { }

  list;
  listSub: Subscription;

  displayedColumns: string[] = ['date', 'item', 'category', 'amount', 'action'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    this.list = this.expenseService.getExpenseList();
    this.dataSource = new MatTableDataSource(this.list);
    this.dataSource.sort = this.sort;

    this.listSub = this.expenseService.getListUpdateListener().subscribe ((list: Expense[]) => {
      this.list = list;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.sort = this.sort;
    });
  }

  delete(id) {
    this.expenseService.deleteItem(id);
  }
}
