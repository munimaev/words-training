import { consts } from "../constants";
import { Reactor } from "../utils";
import { HistoryModel } from "./history-model";
import { Progress, Result, Task, TasksModel, TaskUpdate } from "./tasks-model";

class Model {
  customEvents: Reactor;
  trainingLength = 6;
  maxErrorCount = 3;

  tasks: TasksModel;
  historyModel: HistoryModel;

  constructor(customEvents: Reactor) {
    this.customEvents = customEvents;
    this.tasks = new TasksModel(this.trainingLength);
    this.historyModel = new HistoryModel();
  }

  restoreOrStart() {
    this.customEvents.dispatchEvent("updateCounter");
    if (this.historyModel.getFromStore()) {
      this.customEvents.dispatchEvent("updateRestore");
    } else {
      this.start();
    }
  }

  start() {
    if (history.state !== null) {
      history.replaceState(null, "");
    }
    this.tasks.start();
    this.updateAllViewAndCloseModal();
    this.historyModel.clearStore();
  }

  restore() {
    const state = this.historyModel.getFromStore();
    if (state) {
      this.tasks.restore(state.tasks);
      this.historyModel.restore(state.tasks, state.progress);
    }
    this.updateAllViewAndCloseModal();
  }

  updateAllViewAndCloseModal() {
    this.customEvents.dispatchEvent("updateCounter");
    this.customEvents.dispatchEvent("updateTask");
    this.customEvents.dispatchEvent("closeModal");
  }

  getTaskToDisplay(): Task {
    const currentTask = this.tasks.getCurrent();
    return this.historyModel.getTask(currentTask);
  }

  getProgressToDisplay(): Progress {
    const currentTask = this.tasks.getCurrent();
    return (
      this.historyModel.getProgress(currentTask) || this.tasks.getProgress()
    );
  }

  getResults(): Result {
    return this.tasks.getResults();
  }

  select(id: string) {
    const { solved, letters } = this.tasks.getCurrent();
    const selected = letters.find((letter) => letter.id === id);
    if (!selected) {
      return;
    }
    if (this.tasks.isSelectionCorrect(selected.value)) {
      this.updateTaskAndSave({
        letters: letters.filter((letter) => letter.id !== id),
        solved: [...solved, selected],
      });
      this.customEvents.dispatchEvent("updateTask");
      this.moveNextIfCurrentIsSolved();
    } else {
      this.increaseErrorCount(id);
    }
  }

  enter(symbol: string) {
    if (this.tasks.isHasNoRoomForError(this.maxErrorCount)) {
      return;
    }
    if (this.tasks.isSelectionCorrect(symbol)) {
      this.pushSymbolsToSolved(symbol);
      this.customEvents.dispatchEvent("updateTask");
      this.moveNextIfCurrentIsSolved();
    } else {
      const letterId = this.tasks.getLetterIdBySymbol(symbol);
      this.increaseErrorCount(letterId);
    }
  }

  increaseErrorCount(letterId: string | null) {
    const task = this.tasks.getCurrent();
    this.updateTaskAndSave({ errorCount: task.errorCount + 1 });
    if (task.errorCount >= this.maxErrorCount) {
      this.showAnswerOnFail();
    } else if (letterId) {
      this.customEvents.dispatchEvent("error", letterId);
    }
  }

  showAnswerOnFail() {
    this.updateTaskAndSave({ status: "failed" });
    this.pushSymbolsToSolved();
    this.customEvents.dispatchEvent("updateTask");
    this.moveToNextTask(consts.failPuaseLength);
  }

  pushSymbolsToSolved(symbols?: string) {
    const result = this.tasks.pushSymbolsInCurrent(symbols);
    this.updateTaskAndSave(result);
  }

  moveNextIfCurrentIsSolved() {
    if (this.tasks.isCurrentSolved()) {
      this.updateTaskAndSave({ status: "success" });
      this.moveToNextTask();
    }
  }

  moveToNextTask(timeOut = 0) {
    const nextTaskIndex = this.tasks.getIndex() + 1;
    const task = this.tasks.getCurrent();
    const progress = this.tasks.getProgress();
    if (nextTaskIndex >= this.tasks.getTotal()) {
      setTimeout(() => {
        history.replaceState({ task, progress }, "");
        this.moveToResult();
      }, timeOut);
    } else {
      setTimeout(() => {
        history.replaceState({ task, progress }, "");
        this.tasks.setIndex(nextTaskIndex);
        this.updateTaskAndSave({ status: "started" });
        history.pushState(
          { task: this.tasks.getCurrent(), progress: this.tasks.getProgress() },
          ""
        );
        this.customEvents.dispatchEvent("updateTask");
        this.customEvents.dispatchEvent("updateCounter");
      }, timeOut || consts.animationLength + consts.animationPuase);
    }
  }

  moveToResult() {
    this.historyModel.clearStore();
    this.customEvents.dispatchEvent("updateResults");
  }

  updateTaskAndSave(data: TaskUpdate) {
    this.tasks.updateCurrent(data);
    this.saveStateToStore();
  }

  saveStateToStore() {
    this.historyModel.saveToStore(this.tasks.get(), this.tasks.getProgress());
  }

  history() {
    this.updateAllViewAndCloseModal();
  }
}

export { Model };
