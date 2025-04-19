import Metronome from "./Metronome.js";
import Tapper from "./Tapper.js";
const selector = document.querySelector("#toolSelector");
const toolContainer = document.querySelector(".tool");
toolContainer.classList.add("metronome-container");
let currentTool = "tapper";
let metronome = null;
let tapper = null;
selector.addEventListener("change", () => {
    currentTool = selector.value;
    toolContainer.innerHTML = "";
    renderTool();
});
function renderTool() {
    if (currentTool === "metronome") {
        metronome = new Metronome({ tempo: 120 });
        metronome.init(toolContainer);
    }
    else if (currentTool === "tapper") {
        const tapButton = toolContainer.querySelector(".js-tapper");
        tapper = new Tapper({ tempo: 120 });
        tapper.init(toolContainer);
    }
}
// Initial render
renderTool();
//# sourceMappingURL=tools-main.js.map