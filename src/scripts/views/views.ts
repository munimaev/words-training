import { Progress, Result, Task } from "../models/tasks-model";

interface ViewInterface {
  addSelectLetterHandler: (handler: (id: string) => void) => void;
  addEnterLetterHandler: (handler: (id: string) => void) => void;
  addHistoryHandler: (handler: () => void) => void;
  addModalButtonHandler: (handler: (id: string) => void) => void;

  updateTaskView: (task: Task) => void;
  updateResultView: (result: Result, open: boolean) => void;
  updateRestoreView: (open: boolean) => void;
  updateCountView: (progress: Progress) => void;
  error: (id: string) => void;
  closeModal: () => void;
}

class View implements ViewInterface {
  taskNumber = 1;
  trainingLength = 6;
  task: Task | null = null;
  hasError = false;
  result: Result | null = null;

  updateView() {
    console.clear();
    console.info("English Vocabulary Trainer");
    console.info("Form a valid English word using the given letters");
    console.info(`Question ${this.taskNumber} of ${this.trainingLength}`);
    console.info(`. . . . . . . . `);
    let answer = `answer => `;
    let letters = `letters => `;
    if (this.task) {
      this.task.solved.forEach((letter) => {
        answer += ` [ ${letter.value.toLocaleUpperCase()} ]`;
      });
      this.task.letters.forEach((letter) => {
        letters += ` [ ${letter.value.toUpperCase()} ]`;
      });
    }
    console.log(answer);
    console.log(letters);
    if (this.hasError) {
      console.log("Error!");
    } else {
      console.log("");
    }
  }

  updateCountView(progress: Progress) {
    this.taskNumber = progress.taskNumber;
    this.trainingLength = progress.trainingLength;
    this.updateView();
  }

  updateTaskView(task: Task) {
    this.task = task;
    this.updateView();
  }

  error(id: string) {
    this.hasError = true;
    this.updateView();
    this.hasError = false;
  }

  addSelectLetterHandler(handler: (id: string) => void) {
    // NA
  }

  addEnterLetterHandler(handler: (id: string) => void) {
    document.addEventListener("keydown", (event) => {
      const symbol = event.key.toLocaleLowerCase();
      if (/^[a-z]$/.test(symbol) && !event.metaKey && !event.ctrlKey) {
        handler(symbol);
      }
    });
  }

  updateResultView(result: Result, open: boolean) {
    if (open) {
      this.result = result;
    } else {
      this.result = null;
    }
    this.updateView();
  }

  updateRestoreView(open: boolean) {
    // NA
  }

  closeModal() {
    // NA
  }

  addModalButtonHandler(handler: (id: string) => void) {
    // NA
  }

  addHistoryHandler(handler: () => void) {
    window.addEventListener("popstate", () => {
      handler();
    });
  }
}

export { View };
