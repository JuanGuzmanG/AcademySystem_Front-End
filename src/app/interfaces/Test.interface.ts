import { Question } from "./Question.interface";
import { Result } from "./Result.interface";
import { Subject } from "./Subject.interface";
// This file defines the Test interface used in the application.
export interface Test {
  idTest: number;
  testName: string;
  descriptionTest: string;
  maxPoints: number;
  cantQuestions: number;
  active: boolean;
  subject: Subject;

  questions?: Question[];
  results?: Result[];
}


