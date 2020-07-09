import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private data: DataService) {}

  currentStep: number;
  questions: any;

  imagesArray: any;

  async ngOnInit() {
    await this.data.step.subscribe((step) => (this.currentStep = step));
    await this.data.questions.subscribe(
      (questions) => (this.questions = questions)
    );

    await this.data.images.subscribe((images) => (this.imagesArray = images));
  }
}
