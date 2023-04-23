import { consts } from "./constants";
import { getRandomId, getRandomWords, Reactor, shuffle } from "./utils";

export type Letter = {
  id: string;
  value: string;
};

export type Task = {
  id: string;
  answer: string;
  solved: Letter[];
  letters: Letter[];
  errorCount: number;
  status: TaskStatus;
};
export type TaskUpdate = {
  solved?: Letter[];
  letters?: Letter[];
  errorCount?: number;
  status?: TaskStatus;
};
export type TaskStatus = "success" | "failed" | "pending" | "started";

export type Result = {
  wordsWithoutErrors: number;
  errorCount: number;
  wordWithMostWrrors: string | null;
};
export type Progress = {
  trainingId: number;
  taskNumber: number;
  startedTaskCount: number;
  trainingLength: number;
};

export type StateInStore = {
  tasks: Task[];
  progress: Progress;
};
class Model {
  tasks: Task[] = [];
  trainingId: number = 0;
  currentTask: number = 0;
  customEvents: Reactor;
  trainingLength: number = 4;
  maxErrorCount: number = 3;
  storagKey: string = "state";

  constructor(customEvents: Reactor) {
    this.customEvents = customEvents;
  }

  restoreOrStart() {
    this.customEvents.dispatchEvent("updateCounter");
    if (this.getStateFromStore()) {
      this.customEvents.dispatchEvent("updateRestore");
    } else {
      this.start();
    }
  }

  start() {
    history.pushState(null, "");
    this.trainingId = getRandomId();
    const words = getRandomWords(this.trainingLength);
    this.tasks = words.map((word) =>
      this.createTaskFromWord(this.trainingId, word)
    );
    this.currentTask = 0;
    this.updateAllViewAndCloseModal();
    localStorage.removeItem(this.storagKey);
  }

  restore() {
    const state = this.getStateFromStore();
    console.log(history.state);
    if (state) {
      this.currentTask = state.progress.taskNumber - 1;
      this.trainingId = state.progress.trainingId;
      this.trainingLength = state.progress.trainingLength;
      this.tasks = state.tasks;
      this.tasks
        .filter((task) => task.status !== "pending")
        .forEach((task, i) => {
          const progress = { ...state.progress, taskNumber: i + 1 };
          if (i === 0) {
            history.replaceState({ task, progress }, "");
          } else {
            history.pushState({ task, progress }, "");
          }
        });
    }
    this.updateAllViewAndCloseModal();
  }

  updateAllViewAndCloseModal() {
    this.customEvents.dispatchEvent("updateCounter");
    this.customEvents.dispatchEvent("updateTask");
    this.customEvents.dispatchEvent("closeModal");
  }

  createTaskFromWord(trainingId: number, word: string): Task {
    const letters = this.convertWordToLetters(word);
    return {
      id: `${trainingId}_${word}`,
      answer: word,
      solved: [],
      letters: shuffle(letters),
      errorCount: 0,
      status: "pending",
    };
  }

  convertWordToLetters(word: string, prefix: string = ""): Letter[] {
    return word.split("").map((letter, i) => ({
      id: prefix + `${letter.charCodeAt(0)}_${i}`,
      value: letter,
    }));
  }

  getCurrentTask(): Task {
    return this.tasks[this.currentTask];
  }

  getTaskToDisplay() {
    const historyTask = history.state?.task;
    const currentTask = this.getCurrentTask();
    if (historyTask && historyTask.id !== currentTask.id) {
      console.log("historyTask");
      return historyTask;
    }
    console.log("currentTask");
    return currentTask;
  }

  getProgress(): Progress {
    return {
      trainingId: this.trainingId,
      taskNumber: this.currentTask + 1,
      trainingLength: this.trainingLength,
      startedTaskCount:
        this.trainingLength -
        this.tasks.filter((task) => task.status === "pending").length,
    };
  }

  getProgressToDisplay() {
    const historyTask = history.state?.task;
    const historyProgress = history.state?.progress;
    const currentTask = this.getCurrentTask();

    if (
      historyProgress &&
      historyTask &&
      currentTask &&
      historyTask.id !== currentTask.id
    ) {
      return historyProgress;
    }
    return this.getProgress();
  }

  getResults(): Result {
    const result: Result = {
      wordsWithoutErrors: 0,
      errorCount: 0,
      wordWithMostWrrors: null,
    };
    let maxErrorCount = 0;
    this.tasks.forEach((task) => {
      if (task.errorCount) {
        result.errorCount += task.errorCount;
        if (task.errorCount > maxErrorCount) {
          result.wordWithMostWrrors = task.answer;
          maxErrorCount = task.errorCount;
        }
      } else {
        result.wordsWithoutErrors += 1;
      }
    });
    return result;
  }

  select(id: string) {
    const task = this.getCurrentTask();
    const letters = task.letters;
    const selected = letters.find((letter) => letter.id === id);
    if (!selected) {
      return;
    }
    if (this.isSelectionCorrect(selected.value)) {
      this.updateTaskModel(task, {
        letters: letters.filter((letter) => letter.id !== id),
        solved: [...task.solved, selected],
      });
      this.customEvents.dispatchEvent("updateTask");
      this.checkIfTaskIsSolved(task);
    } else {
      this.increaseErrorCount(id);
    }
  }

  enter(symbol: string) {
    const task = this.getCurrentTask();
    if (!task || task.errorCount >= this.maxErrorCount) {
      return;
    }
    if (this.isSelectionCorrect(symbol)) {
      this.pushSymbolsToSolved(symbol, task);
      this.customEvents.dispatchEvent("updateTask");
      this.checkIfTaskIsSolved(task);
    } else {
      this.increaseErrorCount();
    }
  }

  increaseErrorCount(letterId?: string) {
    const task = this.getCurrentTask();
    this.updateTaskModel(task, { errorCount: task.errorCount + 1 });
    if (task.errorCount >= this.maxErrorCount) {
      this.showAnswerOnFail();
      return;
    } else if (letterId) {
      this.customEvents.dispatchEvent("error", letterId);
    }
  }

  showAnswerOnFail() {
    const task = this.getCurrentTask();
    const { solved, answer } = task;
    this.updateTaskModel(task, { status: "failed" });
    this.pushSymbolsToSolved(answer.substring(solved.length), task);
    this.customEvents.dispatchEvent("updateTask");
    this.moveToNextTask(consts.failPuaseLength);
  }

  pushSymbolsToSolved(symbols: string, task: Task) {
    const letters = [...task.letters];
    const solved = [...task.solved];
    symbols.split("").forEach((symbol) => {
      const index = letters.findIndex((letter) => letter.value === symbol);
      const letter = letters.splice(index, 1)[0];
      solved.push(letter);
    });
    this.updateTaskModel(task, {
      solved,
      letters,
    });
  }

  checkIfTaskIsSolved(task: Task) {
    if (task.solved.length === task.answer.length) {
      this.updateTaskModel(task, { status: "success" });
      this.moveToNextTask();
    }
  }

  moveToNextTask(timeOut: number = 0) {
    const nextTask = this.currentTask + 1;
    const task = this.getCurrentTask();
    const progress = this.getProgress();
    if (nextTask >= this.trainingLength) {
      setTimeout(() => {
        history.replaceState({ task, progress }, "");
        this.moveToResult();
      }, timeOut);
    } else {
      setTimeout(() => {
        history.replaceState({ task, progress }, "");
        this.updateModel({ currentTask: nextTask });

        const newTask = this.getCurrentTask();
        const newProgress = this.getProgress();
        this.updateTaskModel(newTask, { status: "started" });
        history.pushState({ task: newTask, progress: newProgress }, "");
        this.customEvents.dispatchEvent("updateTask");
        this.customEvents.dispatchEvent("updateCounter");
      }, timeOut || consts.animationLength + consts.animationPuase);
    }
  }

  moveToResult() {
    localStorage.removeItem(this.storagKey);
    this.customEvents.dispatchEvent("updateResults");
  }

  isSelectionCorrect(symbol: string): boolean {
    const task = this.getCurrentTask();
    const expected = task.answer[task.solved.length];
    return symbol === expected;
  }
  updateTaskModel(task: Task, data: TaskUpdate) {
    if (data.solved) {
      task.solved = data.solved;
    }
    if (data.letters) {
      task.letters = data.letters;
    }
    if (data.errorCount !== undefined) {
      task.errorCount = data.errorCount;
    }
    if (data.status) {
      task.status = data.status;
    }
    this.saveStateToStore();
  }
  updateModel(data: { currentTask?: number; trainingId?: number }) {
    if (data.currentTask !== undefined) {
      this.currentTask = data.currentTask;
    }
    if (data.trainingId !== undefined) {
      this.trainingId = data.trainingId;
    }
    this.saveStateToStore();
  }

  saveStateToStore() {
    const state: StateInStore = {
      tasks: this.tasks,
      progress: this.getProgress(),
    };
    localStorage.setItem(this.storagKey, JSON.stringify(state));
  }

  getStateFromStore(): StateInStore | null {
    const stateString = localStorage.getItem(this.storagKey);
    if (stateString) {
      try {
        const state = JSON.parse(stateString);
        return state;
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  history() {
    this.updateAllViewAndCloseModal();
  }
}

export { Model };
