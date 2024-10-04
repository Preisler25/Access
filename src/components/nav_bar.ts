export class NavBarElement extends HTMLElement {
  private _title: string = "";
  private _button1Text: string = "";
  private _button2Text: string = "";
  private _button3Text: string = "";

  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["title", "button1-text", "button2-text", "button3-text"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "title":
        this._title = newValue;
        break;
      case "button1-text":
        this._button1Text = newValue;
        break;
      case "button2-text":
        this._button2Text = newValue;
        break;
      case "button3-text":
        this._button3Text = newValue;
        break;
    }
    this.render();
  }

  private render() {
    this.shadow.innerHTML = `
        <style>
          div {
            padding: 10px;
            border: 1px solid black;
            margin: 10px;
          }
        </style>
      `;

    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    const button3 = document.createElement("button");

    h3.textContent = this._title;
    button1.textContent = this._button1Text;
    button2.textContent = this._button2Text;
    button3.textContent = this._button3Text;

    // Dispatch custom events when each button is clicked
    button1.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("button1-click"));
    });
    button2.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("button2-click"));
    });
    button3.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("button3-click"));
    });

    div.appendChild(h3);
    div.appendChild(button1);
    div.appendChild(button2);
    div.appendChild(button3);

    this.shadow.appendChild(div);
  }
}
