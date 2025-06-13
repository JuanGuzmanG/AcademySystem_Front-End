import { Test } from './test.interface';

export interface Subject {
  idSubject: number;
  nameSubject: string;
  descriptionSubject: string;
  tests?: Test[];
}
