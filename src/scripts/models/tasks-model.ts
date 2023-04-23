import { getRandomId, getRandomWords, shuffle } from "../utils";

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
  taskNumber: number;
  trainingLength: number;
};

export class TasksModel {
  tasks: Task[] = [];
  currentTask = 0;
  trainingLength = 6;
  constructor(trainingLength: number) {
    this.trainingLength = trainingLength;
  }

  get(): Task[] {
    return this.tasks;
  }

  getCurrent(): Task {
    return this.tasks[this.currentTask];
  }

  getIndex(): number {
    return this.currentTask;
  }

  getTotal(): number {
    return this.tasks.length;
  }

  setIndex(index: number) {
    this.currentTask = index;
  }

  getCountOfStarted(): number {
    return this.tasks.filter((task) => task.status !== "pending").length;
  }

  getProgress(): Progress {
    return {
      taskNumber: this.getIndex() + 1,
      trainingLength: this.getTotal() || this.trainingLength,
    };
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

  start() {
    const trainingId = getRandomId();
    const words = getRandomWords(this.trainingLength);
    this.tasks = words.map((word) => this.createTaskFromWord(trainingId, word));
    this.currentTask = 0;
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

  convertWordToLetters(word: string, prefix = ""): Letter[] {
    return word.split("").map((letter, i) => ({
      id: prefix + `${letter.charCodeAt(0)}_${i}`,
      value: letter,
    }));
  }

  restore(tasks: Task[]) {
    this.tasks = tasks;
    this.currentTask = this.getCountOfStarted() - 1;
  }

  updateCurrent(data: TaskUpdate) {
    const task = this.getCurrent();
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
  }

  isSelectionCorrect(symbol: string): boolean {
    const task = this.getCurrent();
    const expected = task.answer[task.solved.length];
    return symbol === expected;
  }

  pushSymbolsInCurrent(symbols?: string): {
    letters: Letter[];
    solved: Letter[];
  } {
    const task = this.getCurrent();
    const symbolsToPush = symbols || task.answer.substring(task.solved.length);

    const letters = [...task.letters];
    const solved = [...task.solved];

    symbolsToPush.split("").forEach((symbol) => {
      const index = letters.findIndex((letter) => letter.value === symbol);
      const letter = letters.splice(index, 1)[0];
      solved.push(letter);
    });

    return {
      solved,
      letters,
    };
  }
  isCurrentSolved(): boolean {
    const task = this.getCurrent();
    return task.solved.length === task.answer.length;
  }
  isHasNoRoomForError(maxErrorCount: number): boolean {
    const task = this.getCurrent();
    if (!task || task.errorCount >= maxErrorCount) {
      return true;
    }
    return false;
  }
}
