export class Dialog {
  constructor() {
    this.dialogElement = document.getElementById("dialog");
    this.dialogBackdropElement = document.getElementById("dialog__backdrop");

    this.dialogContentElement = document.getElementById("dialog__content");
  }

  Display(content) {
    this.dialogContentElement.innerHTML = content;
    this.dialogElement.style.display = "flex";
    this.dialogBackdropElement.style.display = "block";
  }

  Close() {
    this.dialogContentElement = "";
    this.dialogElement.style.display = "none";
    this.dialogBackdropElement.style.display = "none";
  }
}
