import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { Expense } from '../expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit, AfterViewInit {

  constructor(public expenseService: ExpenseService) { }

  list;
  listSub: Subscription;

  displayedColumns: string[] = ['date', 'item', 'category', 'amount', 'action'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    console.log(this.sort);
    console.log(this.paginator);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.list = this.expenseService.getExpenseList();
    this.dataSource = new MatTableDataSource(this.list);
    this.listSub = this.expenseService.getListUpdateListener().subscribe ((list: Expense[]) => {
      this.list = list;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.sort = this.sort;
    });
  }

  delete(id) {
    this.expenseService.deleteItem(id);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
