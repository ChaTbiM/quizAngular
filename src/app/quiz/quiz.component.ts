import { DataService } from "../data.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"],
})
export class QuizComponent implements OnInit {
  constructor(private apiService: ApiService, private data: DataService) {}

  currentStep: number;
  questions: any;
  nextStep;
  guess;
  answer;

  changeStep() {
    if (this.currentStep <= 3 && this.guess >= 0) {
      this.data.isNextClicked();
      let lastGuess = -1;
      // correct
      if (this.guess == this.answer) {
        this.data.updateImages("assets/happyemoji.png", this.currentStep);
      } else {
        // wrong
        this.data.updateImages("assets/sademoji.png", this.currentStep);
      }

      setTimeout(
        () => {
          this.data.isNextClicked();
          this.data.incrementStep();
          this.data.changeGuessedAnswer(lastGuess);
        },
        2000,
        lastGuess
      );
    } else if (this.currentStep == 4 && this.guess >= 0) {
      this.data.isNextClicked();
      let lastGuess = -1;
      // correct
      if (this.guess == this.answer) {
        this.data.updateImages("assets/happyemoji.png", this.currentStep);
      } else {
        // wrong
        this.data.updateImages("assets/sademoji.png", this.currentStep);
      }
    }
  }

  async ngOnInit() {
    await this.apiService.getQuestions().subscribe((data: any) => {
      this.data.initQuestions(data);
      this.questions = data;
      this.data.updateAnswer(data[0].answer);
    });

    await this.data.step.subscribe((step) => {
      this.currentStep = step;
    });
    await this.data.isNext.subscribe((state) => (this.nextStep = state));
    await this.data.guess.subscribe(
      (guessedNumber) => (this.guess = guessedNumber)
    );
    await this.data.answer.subscribe((answer) => (this.answer = answer));
  }
}
