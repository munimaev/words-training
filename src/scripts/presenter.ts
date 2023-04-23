import { View } from "./views/views";
import { Model } from "./models/models";
import { Reactor } from "./utils";

class Presenter {
  model: Model;
  view: View;
  customEvents: Reactor;

  constructor(model: Model, view: View, customEvents: Reactor) {
    this.model = model;
    this.view = view;
    this.customEvents = customEvents;

    this.view.addSelectLetterHandler((id: string) => {
      model.select(id);
    });
    this.view.addEnterLetterHandler((symbol: string) => {
      model.enter(symbol);
    });
    this.view.addHistoryHandler(() => {
      model.history();
    });
    this.view.addModalButtonHandler((id: string) => {
      switch (id) {
        case "restart":
          model.start();
          break;
        case "restore":
          model.restore();
          break;
        case "close":
          view.closeModal();
          break;
        default:
          throw new Error(`Unexpected modal action id: ${id}`);
      }
    });

    this.customEvents.registerEvent("updateTask", function () {
      view.updateTaskView(model.getTaskToDisplay());
    });

    this.customEvents.registerEvent("updateResults", function () {
      view.updateResultView(model.getResults(), true);
    });

    this.customEvents.registerEvent("updateRestore", function () {
      view.updateRestoreView(true);
    });

    this.customEvents.registerEvent("updateCounter", function () {
      view.updateCountView(model.getProgressToDisplay());
    });

    this.customEvents.registerEvent("error", function (id) {
      view.error(id as string);
    });

    this.customEvents.registerEvent("closeModal", function () {
      view.closeModal();
    });

    this.model.restoreOrStart();
  }
}

export { Presenter };
