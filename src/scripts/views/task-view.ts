import { Task } from "../models/tasks-model";
import { ButtonView } from "./button-view";

export class TaskView {
  lettersWrapper: HTMLElement;
  answerWrapper: HTMLElement;
  buttons: Map<string, ButtonView> = new Map();
  taskId: string | null = null;

  constructor() {
    this.lettersWrapper = document.getElementById("letters") as HTMLElement;
    this.answerWrapper = document.getElementById("answer") as HTMLElement;
  }

  updateView(task: Task) {
    if (this.taskId !== task.id) {
      this.taskId = task.id;
      this.deletButtons();
      this.createButtons(task);
    } else {
      this.detachButtons();
    }
    this.updateButtonsView(task);
  }

  deletButtons() {
    this.answerWrapper.innerHTML = "";
    this.lettersWrapper.innerHTML = "";
    this.buttons = new Map();
  }

  createButtons(task: Task) {
    [...task.solved, ...task.letters].forEach((letter) => {
      const button = new ButtonView(letter);
      this.buttons.set(letter.id, button);
    });
  }

  detachButtons() {
    this.buttons.forEach((button) => {
      const element = button.getElement();
      element.parentElement?.removeChild(element);
    });
  }

  updateButtonsView(task: Task) {
    task.solved.forEach((letter) => {
      const button = this.buttons.get(letter.id);
      if (!button) {
        return;
      }
      if (task.status === "failed") {
        button.makeFailed();
      } else {
        button.makeSuccess();
      }
      this.answerWrapper.append(button.getElement());
    });
    task.letters.forEach((letter) => {
      const button = this.buttons.get(letter.id);
      if (button) {
        button.makePrimary();
        this.lettersWrapper.append(button.getElement());
      }
    });
  }

  error(id: string) {
    this.buttons.get(id)?.makeError();
  }

  addSelectLetterHandler(handler: (id: string) => void) {
    this.lettersWrapper.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement;
      const index = target.getAttribute("data-index");
      if (index) {
        handler(index);
      }
    });
  }

  addEnterLetterHandler(handler: (symbol: string) => void) {
    document.addEventListener("keydown", (event) => {
      const symbol = event.key.toLocaleLowerCase();
      if (/^[a-z]$/.test(symbol) && !event.metaKey && !event.ctrlKey) {
        handler(symbol);
      }
    });
  }
}
