import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor() {}

  private questionsSource = new BehaviorSubject([
    {
      questions: "question",
      choice1: "choice1",
      choice2: "choice2",
      choice3: "choice3",
      answer: 3,
    },
  ]);

  private currentStepSource = new BehaviorSubject(0);
  // private choosedAnswersSource = new BehaviorSubject([]);
  private isNextClickedSource = new BehaviorSubject(false);
  private guessSource = new BehaviorSubject(-1);
  private imagesSource = new BehaviorSubject([
    "assets/emptyemoji.png",
    "assets/emptyemoji.png",
    "assets/emptyemoji.png",
    "assets/emptyemoji.png",
    "assets/emptyemoji.png",
  ]);
  private answerSource = new BehaviorSubject(null);

  // getters
  questions = this.questionsSource.asObservable();
  step = this.currentStepSource.asObservable();
  isNext = this.isNextClickedSource.asObservable();
  guess = this.guessSource.asObservable();
  images = this.imagesSource.asObservable();
  answer = this.answerSource.asObservable();

  //setter
  initQuestions(questionsList) {
    this.questionsSource.next(questionsList);
  }
  incrementStep() {
    let number = this.currentStepSource.getValue() + 1;
    if (number < 5) {
      this.currentStepSource.next(number);
    }
  }

  isNextClicked() {
    let state = !this.isNextClickedSource.getValue();
    this.isNextClickedSource.next(state);
  }

  changeGuessedAnswer(guessedNumber) {
    this.guessSource.next(guessedNumber);
  }

  updateImages(image: string, index: number) {
    let arr = this.imagesSource.getValue();
    arr[index] = image;
    this.imagesSource.next(arr);
  }

  updateAnswer(answer) {
    this.answerSource.next(answer);
  }
}
