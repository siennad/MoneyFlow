import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseGraphComponent } from './expense-graph.component';

describe('ExpenseGraphComponent', () => {
  let component: ExpenseGraphComponent;
  let fixture: ComponentFixture<ExpenseGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
