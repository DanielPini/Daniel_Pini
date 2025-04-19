import Metronome from "./Metronome.js";
import Tapper from "./Tapper.js";

const selector = document.querySelector("#toolSelector") as HTMLSelectElement;
const toolContainer = document.querySelector(".tool") as HTMLDivElement;
toolContainer.classList.add("metronome-container");

let currentTool: "metronome" | "tapper" = "tapper";
let metronome: Metronome | null = null;
let tapper: Tapper | null = null;

selector.addEventListener("change", () => {
  currentTool = selector.value as "metronome" | "tapper";
  toolContainer.innerHTML = "";
  renderTool();
});

function renderTool() {
  if (currentTool === "metronome") {
    metronome = new Metronome({ tempo: 120 });
    metronome.init(toolContainer);
  } else if (currentTool === "tapper") {
    const tapButton = toolContainer.querySelector(
      ".js-tapper"
    ) as HTMLButtonElement;
    tapper = new Tapper({ tempo: 120 });
    tapper.init(toolContainer);
  }
}
// Initial render
renderTool();
