import { Test } from './Test.interface';

export interface Subject {
  idSubject: number;
  nameSubject: string;
  descriptionSubject: string;
  tests?: Test[];
}

export interface NewSubject{
  nameSubject: string;
  descriptionSubject: string;
}
