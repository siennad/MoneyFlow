import { Category } from './category.model';

export interface Expense {
  id: number;
  name: string;
  spend: number;
  category: Category;
}
