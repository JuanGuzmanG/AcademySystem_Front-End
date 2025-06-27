import { Test } from './Test.interface';

export interface Subject {
  subjectId: number;
  subjectName: string;
  subjectDescription: string;
  tests?: Test[];
}

export interface NewSubject{
  subjectName: string;
  subjectDescription: string;
}
