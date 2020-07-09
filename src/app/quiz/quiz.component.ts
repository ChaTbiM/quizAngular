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
  guess: number;
  answer: number;

  changeStep() {
    if (this.currentStep < this.questions.length && this.guess >= 0) {
      this.data.isNextClicked();
      let lastGuess = 0;
      // correct
      if (this.guess == this.answer) {
        this.data.updateImages("assets/happyemoji.png", this.currentStep);
      } else {
        // wrong
        this.data.updateImages("assets/sademoji.png", this.currentStep);
      }

      setTimeout(
        () => {
          this.data.incrementStep();
          this.data.isNextClicked();
          this.data.changeGuessedNumber(lastGuess);
        },
        2000,
        lastGuess
      );
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
