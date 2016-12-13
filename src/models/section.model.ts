import { Document } from './document.model';

export class Section {
  title: string;
  description: string;
  repeatable: boolean;
  position: number;
  document: Document;
  master: Section;
  children: Section[];
  // inputs: Input[];
}