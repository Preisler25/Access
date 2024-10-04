import { AccessService } from "./services/access_service";
import { AccessDisplayElement } from "./components/access_display_element";
import { NavBarElement } from "./components/nav_bar";

const app = document.querySelector<HTMLDivElement>("#app")!;

customElements.define("access-display", AccessDisplayElement);
customElements.define("nav-bar", NavBarElement);

const navBar = document.createElement("nav-bar");
navBar.setAttribute("title", "Accesses Feladat");
navBar.setAttribute("button1-text", "Név");
navBar.setAttribute("button2-text", "IP");
navBar.setAttribute("button3-text", "Idő");

navBar.addEventListener("button1-click", () => {
  AccessService.sortAccessesByName();
  app.innerHTML = "";
  app.appendChild(navBar);
  AccessService.accesses.forEach((access) => {
    const accessElement = document.createElement("access-display");
    accessElement.setAttribute("name", access.name);
    accessElement.setAttribute("ip", access.ip);
    accessElement.setAttribute("access_time", access.access_time.toString());
    app.appendChild(accessElement);
  });
});

navBar.addEventListener("button2-click", () => {
  AccessService.sortAccessesByIp();
  app.innerHTML = "";
  app.appendChild(navBar);
  AccessService.accesses.forEach((access) => {
    const accessElement = document.createElement("access-display");
    accessElement.setAttribute("name", access.name);
    accessElement.setAttribute("ip", access.ip);
    accessElement.setAttribute("access_time", access.access_time.toString());
    app.appendChild(accessElement);
  });
});

navBar.addEventListener("button3-click", () => {
  AccessService.sortAccessesByAccessTime();
  app.innerHTML = "";
  app.appendChild(navBar);
  AccessService.accesses.forEach((access) => {
    const accessElement = document.createElement("access-display");
    accessElement.setAttribute("name", access.name);
    accessElement.setAttribute("ip", access.ip);
    accessElement.setAttribute("access_time", access.access_time.toString());
    app.appendChild(accessElement);
  });
});

app.appendChild(navBar);

AccessService.saveAccesses().then(() => {
  const accesses = AccessService.accesses;
  accesses.forEach((access) => {
    const accessElement = document.createElement("access-display");
    accessElement.setAttribute("name", access.name);
    accessElement.setAttribute("ip", access.ip);
    accessElement.setAttribute("access_time", access.access_time.toString());
    app.appendChild(accessElement);
  });
});

const oneMinTimer = setInterval(() => {
  AccessService.saveAccesses().then(() => {
    app.innerHTML = "";
    app.appendChild(navBar);
    AccessService.accesses.forEach((access) => {
      const accessElement = document.createElement("access-display");
      accessElement.setAttribute("name", access.name);
      accessElement.setAttribute("ip", access.ip);
      accessElement.setAttribute("access_time", access.access_time.toString());
      app.appendChild(accessElement);
    });
  });
}, 60 * 1000);

oneMinTimer;
