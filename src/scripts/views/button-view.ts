import { consts } from "../constants";
import { Letter } from "../models/tasks-model";

export class ButtonView {
  element: HTMLButtonElement;
  status: "primary" | "success" | "failed" = "primary";

  constructor(letter: Letter) {
    this.element = document.createElement("button");
    this.element.setAttribute("type", "button");
    this.element.setAttribute("data-index", letter.id);
    this.element.className = "btn";
    const animationLength = consts.animationLength / 100;
    this.element.style.cssText = `width: 42px; margin: 3px; transition-property: all; transition-duration: 0.${animationLength}s;`;
    this.element.innerText = letter.value;
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }

  updateClasses(className: string) {
    if (this.element.className === "btn") {
      this.element.classList.add(className);
    } else {
      setTimeout(() => {
        this.element.className = `btn ${className}`;
      }, 0);
    }
  }

  makePrimary() {
    this.status = "primary";
    this.updateClasses("btn-primary");
  }

  makeSuccess() {
    this.status = "success";
    this.updateClasses("btn-success");
  }

  makeError() {
    this.updateClasses("btn-danger");
    setTimeout(() => {
      if (this.status !== "failed") {
        this.updateClasses("btn-primary");
      }
    }, consts.animationLength);
  }

  makeFailed() {
    this.status = "failed";
    this.updateClasses("btn-danger");
  }
}
