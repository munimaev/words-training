import { Result } from "../models";
import { ModalView } from "./modal_view";

export class ResultlView {
  modal: ModalView;

  constructor(modal: ModalView) {
    this.modal = modal;
  }

  updateView(result: Result | null) {
    if (result) {
      const wordWithMostWrrors = result.wordWithMostWrrors || "—";
      this.modal.updateView({
        title: "Training result",
        body: `<p>Number of words without errors: ${result.wordsWithoutErrors}</p>
        <p>Number of errors: ${result.errorCount}</p>
        <p>The word with the most errors: ${wordWithMostWrrors}</p>`,
        buttons: [{ text: "Try again", id: "restart", type: "accept" }],
      });
    } else {
      this.modal.close;
    }
  }
}
