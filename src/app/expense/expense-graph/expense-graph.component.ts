import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Chart } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-expense-graph',
  templateUrl: './expense-graph.component.html',
  styleUrls: ['./expense-graph.component.css']
})
export class ExpenseGraphComponent implements OnInit, AfterViewInit {

  constructor(private expenseService: ExpenseService) {
    console.log(this.chartContainer)

   }
  rawData;
  chartDataText = [];
  chartDataValue = [];
  chartDataAsObj = [];
  chartShown = false;
  pieChart;
  @ViewChild('chartContainer') chartContainer: ElementRef;

  ngAfterViewInit(){
  }

  ngOnInit() {
    this.rawData = this.expenseService.divideExpenseByCategory();
    this.rawData.map((a) => {
      this.chartDataText.push(a.category);
      this.chartDataValue.push(a.ValueExpense.totalSpend);
      this.chartDataAsObj.push({category: a.category, value: a.ValueExpense.totalSpend});
    });    
    
  }

  showChart() {
    this.chartShown = true;
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
          labels: this.chartDataText,
          datasets: [{
              label: '# of Votes',
              data: this.chartDataValue,
              backgroundColor: [
                  'rgba(205, 104, 132, 0.4)',
                  'rgba(104, 137, 205, 0.4)',
                  'rgba(255, 206, 86, 0.4)',
                  'rgba(75, 192, 192, 0.4)',
                  'rgba(153, 102, 255, 0.4)',
                  'rgba(255, 159, 64, 0.4)'
              ],
              borderColor: [
                  'rgba(205, 104, 132,1)',
                  'rgba(104, 137, 205, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
              hoverBackgroundColor: [
                'rgba(205, 104, 132, 0.8)',
                'rgba(104, 137, 205,  0.8)',
                'rgba(255, 206, 86,  0.8)',
                'rgba(75, 192, 192,  0.8)',
                'rgba(153, 102, 255,  0.8)',
                'rgba(255, 159, 64,  0.8)'
            ],
          }]
      },
      options: {}
    });
  }

  hideChart() {
    this.chartShown = false;
    $('#chart').hide();
  }

}
