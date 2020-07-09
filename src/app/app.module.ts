import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ChoicesComponent } from "./choices/choices.component";
import { AgreeButtonComponent } from "./agree-button/agree-button.component";
import { BookComponent } from "./book/book.component";
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChoicesComponent,
    AgreeButtonComponent,
    BookComponent,
    QuizComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
