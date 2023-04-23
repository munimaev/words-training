import { Progress, Result, Task } from "../models/tasks-model";
import { ButtonView } from "./button-view";
import { CounterView } from "./counter-view";
import { ModalView } from "./modal-view";
import { RestorelView } from "./restore-view";
import { ResultlView } from "./result-view";
import { TaskView } from "./task-view";

class View {
  buttons: Map<string, ButtonView> = new Map();
  modal: ModalView;
  task: TaskView;
  result: ResultlView;
  restore: RestorelView;
  counter: CounterView;

  constructor() {
    this.task = new TaskView();
    this.counter = new CounterView();
    this.modal = new ModalView();
    this.result = new ResultlView(this.modal);
    this.restore = new RestorelView(this.modal);
  }

  updateCountView(progress: Progress) {
    this.counter.updateView(progress.taskNumber, progress.trainingLength);
  }

  updateTaskView(task: Task) {
    this.task.updateView(task);
  }

  error(id: string) {
    this.task.error(id);
  }

  addSelectLetterHandler(handler: (id: string) => void) {
    this.task.addSelectLetterHandler(handler);
  }

  addEnterLetterHandler(handler: (id: string) => void) {
    this.task.addEnterLetterHandler(handler);
  }

  updateResultView(result: Result, open: boolean) {
    this.result.updateView(result, open);
  }

  updateRestoreView(open: boolean) {
    this.restore.updateView(open);
  }

  closeModal() {
    this.modal.close();
  }

  addModalButtonHandler(handler: (id: string) => void) {
    this.modal.addButtonHandler(handler);
  }

  addHistoryHandler(handler: () => void) {
    window.addEventListener("popstate", () => {
      handler();
    });
  }
}

export { View };
