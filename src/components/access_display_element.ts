export class AccessDisplayElement extends HTMLElement {
  private _name: string = "";
  private _ip: string = "";
  private _access_time: string = "";
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name", "ip", "access_time"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "name":
        this._name = newValue;
        break;
      case "ip":
        this._ip = newValue;
        break;
      case "access_time":
        this._access_time = newValue;
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
    const p = document.createElement("p");
    const p2 = document.createElement("p");

    h3.textContent = this._name;
    p.textContent = this._ip;
    p2.textContent = this._access_time;

    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(p2);

    this.shadow.appendChild(div);
  }
}
