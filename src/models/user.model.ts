import { State } from './state.model';
import { Assignment } from './assignment.model';
import { Notification } from './notification.model';

export class User {
	_id: string;
  completedAt: Date;
  local: any;
  states: State[];
  assignments: Assignment[];
  notifications: Notification[];
  role: string;
}