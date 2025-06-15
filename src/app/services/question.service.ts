import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/Question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public listQuestionsOfTest(testId: number): Observable<Question[]>{
    return this.http.get<Question[]>(`${baseURL}/questions/test/${testId}`);
  }

  public addQuestion(question: Question): Observable<Question>{
    return this.http.post<Question>(`${baseURL}/questions/add`, question);
  }

  public deleteQuestion(questionId: number): Observable<any>{
    return this.http.delete<any>(`${baseURL}/questions/delete/${questionId}`);
  }

  public updateQuestion(question: Question): Observable<Question>{
    return this.http.put<Question>(`${baseURL}/questions/update`, question);
  }

  public getQuestion(questionId: number): Observable<Question>{
    return this.http.get<Question>(`http://localhost:8080/questions/${questionId}`);
  }

  public evaluateTest(questions:Question[]): Observable<{ cantCorrect: number; attempts: number; maxPoints: number }>{
    return this.http.post<{ cantCorrect: number; attempts: number; maxPoints: number }>("http://localhost:8080/questions/evaluateTest", questions);
  }
}
