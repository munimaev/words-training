import { Task } from "../models";
import { ButtonView } from "./button_view";

export class CounterView {
  currentQuestion: HTMLElement;
  totalQuestions: HTMLElement;

  constructor() {
    this.currentQuestion = document.getElementById(
      "current_question"
    ) as HTMLElement;
    this.totalQuestions = document.getElementById(
      "total_questions"
    ) as HTMLElement;
  }

  updateView(current: number, total: number) {
    this.currentQuestion.innerText = String(current);
    this.totalQuestions.innerText = String(total);
  }
}
