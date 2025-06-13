import { Question } from "./question.interface";
import { Result } from "./result.interface";
import { Subject } from "./subject.interface";

export interface Test {
  idTest: number;
  testName: string;
  testDescription: string;
  maxPoints: number;
  cantQuestions: number;
  active: boolean;
  subject: Subject;

  questions?: Question[];
  results?: Result[];
}