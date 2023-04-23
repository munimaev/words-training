import { consts } from "../constants";
import { Letter, Progress, Result, Task } from "../models";
import { ButtonView } from "./button_view";
import { CounterView } from "./counter_view";
import { ModalView } from "./modal_view";
import { RestorelView } from "./restore_view";
import { ResultlView } from "./result_view";
import { TaskView } from "./task_view";

class View {
  buttons: Map<string, ButtonView> = new Map();
  modal: ModalView;
  trainingId: number = 0;
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
    this.trainingId = progress.trainingId;
    this.counter.updateView(progress.taskNumber, progress.trainingLength);
  }

  updateTaskView(task: Task) {
    this.task.updateView(task);
  }

  error(id: string) {
    this.task.error(id);
  }

  addSelectLetterHandler(handler: (id: any) => void) {
    this.task.addSelectLetterHandler(handler);
  }

  addEnterLetterHandler(handler: (id: any) => void) {
    this.task.addEnterLetterHandler(handler);
  }

  updateResultView(result: Result, open: boolean) {
    this.result.updateView(result);
  }

  updateRestoreView(open: boolean) {
    this.restore.updateView(open);
  }

  closeModal() {
    this.modal.close();
  }

  addModalButtonHandler(handler: (id: any) => void) {
    this.modal.addButtonHandler(handler);
  }

  addHistoryHandler(handler: () => void) {
    window.addEventListener("popstate", () => {
      handler();
    });
  }
}

export { View };
