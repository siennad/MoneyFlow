import { Budget } from './../budget-input/budget.model';
import {User} from '../user/user.model';
import { Category } from './category.model';
import { MatDateFormats } from '@angular/material';

export interface Expense {
  id: string;
  name: string;
  spend: number;
  category: Category;
  date: MatDateFormats;
  userId: User['id'];
  budgetId: Budget['id'];
}
