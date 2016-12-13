import { State } from './state.model';
import { Assignment } from './assignment.model';

export class User {
	_id: string;
  completedAt: Date;
  local: any;
  states: [State];
  assignments: [Assignment];
  role: string;
}