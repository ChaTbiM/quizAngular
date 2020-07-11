import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  questionsUrl =
    "https://cors-anywhere.herokuapp.com/https://www.quizzito.com/main/assets/try_quiz/quizzes/tha3lab.json";

  constructor(private httpClient: HttpClient) {}

  public getQuestions() {
    return this.httpClient.get(this.questionsUrl);
  }
}
