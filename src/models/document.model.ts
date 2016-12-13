import { Part } from './part.model';
import { State } from './state.model';
import { Assignment } from './assignment.model';
import { Section } from './section.model';

export class Document {
	_id: string;
	partId: string;
	title: string;
	position: number;
  part: Part | any;
  state: State;
  isOngoing: boolean;
  assignments: Assignment[];
  sections: Section[];
}