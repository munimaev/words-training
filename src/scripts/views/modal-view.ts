import { consts } from "../constants";

export type ModalModel = {
  title: string;
  body: string;
  buttons: ModalButtonModel[];
};

export type ModalButtonModel = {
  text: string;
  id: string;
  type: "accept" | "reject";
};

export class ModalView {
  wrapper: HTMLDivElement;
  modal: HTMLDivElement;
  title: HTMLHeadingElement;
  body: HTMLDivElement;
  footer: HTMLDivElement;
  show = false;
  handler: null | ((id: string) => void) = null;

  constructor() {
    this.wrapper = this.createWrapper();
    this.title = this.createTitle();
    this.body = this.createBody();
    this.footer = this.createFooter();
    this.modal = this.createModal();
  }

  createWrapper(): HTMLDivElement {
    const wrapper = document.createElement("div");
    wrapper.className = "modal-backdrop fade";
    return wrapper;
  }

  createTitle(): HTMLHeadingElement {
    const title = document.createElement("h5");
    title.className = "modal-title";
    return title;
  }

  createBody(): HTMLDivElement {
    const body = document.createElement("div");
    body.className = "modal-body";
    return body;
  }

  createFooter(): HTMLDivElement {
    const footer = document.createElement("div");
    footer.className = "modal-footer";
    return footer;
  }

  createModal(): HTMLDivElement {
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.style.cssText = `display: block`;

    const dialog = document.createElement("div");
    dialog.className = "modal-dialog  modal-dialog-centered";

    const content = document.createElement("div");
    content.className = "modal-content";

    const header = document.createElement("div");
    header.className = "modal-header";

    modal.append(dialog);
    dialog.append(content);
    content.append(header);
    header.append(this.title);
    content.append(this.body);
    content.append(this.footer);

    return modal;
  }

  open() {
    if (!this.show) {
      this.show = true;
      document.body.append(this.modal);
      document.body.append(this.wrapper);
      setTimeout(() => {
        this.wrapper.classList.add("show");
        this.modal.classList.add("show");
      }, consts.animationPuase);
    }
  }

  close() {
    if (this.show) {
      this.show = false;
      this.wrapper.classList.remove("show");
      this.modal.classList.remove("show");
      setTimeout(() => {
        this.wrapper.parentElement?.removeChild(this.wrapper);
        this.modal.parentElement?.removeChild(this.modal);
      }, consts.animationLength);
    }
  }

  updateView(model: ModalModel) {
    this.title.innerHTML = model.title;
    this.body.innerHTML = model.body;
    this.footer.innerHTML = "";
    model.buttons.forEach((button) => {
      this.footer.append(this.createButton(button));
    });
    this.open();
  }

  createButton(model: ModalButtonModel): HTMLButtonElement {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.className = model.type === "accept" ? "btn btn-primary" : "btn";
    button.innerText = model.text;
    button.addEventListener("click", () => {
      this.handler && this.handler(model.id);
    });
    return button;
  }

  addButtonHandler(handler: (id: string) => void) {
    this.handler = handler;
  }
}
