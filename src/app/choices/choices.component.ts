import { DataService } from "../data.service";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";

@Component({
  selector: "app-choices",
  templateUrl: "./choices.component.html",
  styleUrls: ["./choices.component.css"],
})
export class ChoicesComponent implements OnInit, AfterViewInit {
  @ViewChild("firstChoice", { static: false }) firstChoice: ElementRef;
  @ViewChild("secondChoice", { static: false }) secondChoice: ElementRef;
  @ViewChild("thirdChoice", { static: false }) thirdChoice: ElementRef;

  constructor(private data: DataService) {}

  currentStep: number;
  questions: any;
  guess;
  answer: number;
  nextStep: boolean;
  shuffledChoices = this.shuffle(["choice1", "choice2", "choice3"]);
  answerIds = this.extractId(this.shuffledChoices);

  shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  extractId(array) {
    let newArr = [];
    array.forEach((element) => {
      let numb = element.match(/\d/g);
      numb = numb.join("");
      newArr.push(numb);
    });
    console.log("new array", newArr);
    return newArr;
  }

  async ngOnInit() {
    await this.data.step.subscribe((step) => (this.currentStep = step));
    await this.data.questions.subscribe((questions) => {
      // this.questions = questions;

      let results = [];
      questions.forEach((obj) => {
        let arr = Object.keys(obj).map((key) => [key, obj[key]]);
        arr[1][0] = arr[1][0].match(/\d/g).join("");
        arr[2][0] = arr[2][0].match(/\d/g).join("");
        arr[3][0] = arr[3][0].match(/\d/g).join("");
        results.push(arr);
      });
      this.questions = results;
    });
    await this.data.isNext.subscribe((state) => (this.nextStep = state));
    await this.data.guess.subscribe(
      (guessedNumber) => (this.guess = guessedNumber)
    );

    await this.data.answer.subscribe((answer) => (this.answer = answer));
  }

  updateGuess(event: any) {
    this.guess = event.target.getAttribute("id");
    // this.guess = event.target.textContent;
    this.data.changeGuessedAnswer(this.guess);
  }

  ngAfterViewInit() {
    this.firstChoice.nativeElement.addEventListener(
      "click",
      this.updateGuess.bind(this)
    );
    this.secondChoice.nativeElement.addEventListener(
      "click",
      this.updateGuess.bind(this)
    );
    this.thirdChoice.nativeElement.addEventListener(
      "click",
      this.updateGuess.bind(this)
    );
  }
}
