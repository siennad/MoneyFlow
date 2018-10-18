import { Budget } from './../budget-input/budget.model';
import {User} from '../user/user.model';

import { MatDateFormats } from '@angular/material';

export interface Expense {
  id?: string;
  name: string;
  spend: number;
  category: string;
  date: MatDateFormats;
  budgetId?: Budget['id'];
}
