import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public listQuestionsOfTest(testId: any){
    return this.http.get(`http://localhost:8080/questions/test/${testId}`);
  }

  public addQuestion(question: any){
    return this.http.post("http://localhost:8080/questions/add", question);
  }

  public deleteQuestion(questionId: any){
    return this.http.delete(`http://localhost:8080/questions/delete/${questionId}`);
  }

  public updateQuestion(question: any){
    return this.http.put("http://localhost:8080/questions/update", question);
  }

  public getQuestion(questionId: any){
    return this.http.get(`http://localhost:8080/questions/${questionId}`);
  }

  public evaluateTest(questions:any){
    return this.http.post("http://localhost:8080/questions/evaluateTest", questions);
  }
}
