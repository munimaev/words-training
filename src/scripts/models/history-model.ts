import { Progress, Task } from "./tasks-model";

export type StateInStore = {
  tasks: Task[];
  progress: Progress;
};

export class HistoryModel {
  storagKey = "state";

  restore(tasks: Task[], progress: Progress) {
    tasks
      .filter((task) => task.status !== "pending")
      .forEach((task, i) => {
        const historyProgress = { ...progress, taskNumber: i + 1 };
        if (i === 0) {
          history.replaceState({ task, progress: historyProgress }, "");
        } else {
          history.pushState({ task, progress: historyProgress }, "");
        }
      });
  }

  saveToStore(tasks: Task[], progress: Progress) {
    const state: StateInStore = {
      tasks,
      progress,
    };
    localStorage.setItem(this.storagKey, JSON.stringify(state));
  }

  getFromStore(): StateInStore | null {
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

  getProgress(currentTask: Task): Progress | null {
    const historyTask: Task | undefined = history.state?.task;
    const historyProgress: Progress | undefined = history.state?.progress;
    if (
      historyProgress &&
      historyTask &&
      currentTask &&
      historyTask.id !== currentTask.id
    ) {
      return historyProgress;
    }
    return null;
  }

  getTask(currentTask: Task): Task {
    const historyTask: Task | undefined = history.state?.task;
    if (historyTask && historyTask.id !== currentTask.id) {
      return historyTask;
    }
    return currentTask;
  }

  clearStore() {
    localStorage.removeItem(this.storagKey);
  }
}
