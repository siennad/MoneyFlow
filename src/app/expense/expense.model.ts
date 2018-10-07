import { Category } from './category.model';

export interface Expense {
  id: string;
  name: string;
  spend: number;
  category: Category;
}
