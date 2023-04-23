import { ModalView } from "./modal-view";

export class RestorelView {
  modal: ModalView;

  constructor(modal: ModalView) {
    this.modal = modal;
  }

  updateView(open: boolean) {
    if (open) {
      this.modal.updateView({
        title: "Restore training?",
        body: `<p>Do you want to continue the last training?</p>`,
        buttons: [
          { text: "Close", id: "restart", type: "reject" },
          { text: "Restore", id: "restore", type: "accept" },
        ],
      });
    } else {
      this.modal.close();
    }
  }
}
