import { State } from './state.model';
import { Assignment } from './assignment.model';
import { Notification } from './notification.model';
import { Response } from './response.model';

export class User {
	_id: string;
  completedAt: Date;
  local: any;
  states: State[];
  assignments: Assignment[];
  responses: Response[];
  notifications: Notification[];
  role: string;

  isAdmin() : boolean {
  	return this.role == 'admin';
  }
}