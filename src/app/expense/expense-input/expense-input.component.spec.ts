import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseInputComponent } from './expense-input.component';

describe('ExpenseInputComponent', () => {
  let component: ExpenseInputComponent;
  let fixture: ComponentFixture<ExpenseInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
