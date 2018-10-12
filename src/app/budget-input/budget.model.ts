import {User} from '../user/user.model';

export interface Budget {
  id: string;
  period: string;
  amount: number;
  date: Date;
  userId: User['id'];
}
