import { Category } from './category.model';
import { MatDateFormats } from '@angular/material';

export interface Expense {
  id: string;
  name: string;
  spend: number;
  category: Category;
  date: MatDateFormats;
}
