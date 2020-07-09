import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  questionsUrl =
    "http://localhost:4200/main/assets/try_quiz/quizzes/tha3lab.json";
  constructor(private httpClient: HttpClient) {}

  public getQuestions() {
    return this.httpClient.get(this.questionsUrl);
  }
}
