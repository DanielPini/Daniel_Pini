import Metronome from "./Metronome.js";
import Tapper from "./Tapper.js";
import tempoDatabase from "./examples.js";
const selector = document.querySelector("#toolSelector");
const toolContainer = document.querySelector(".tool");
toolContainer.classList.add("metronome-container");
let currentTool = "tapper";
let metronome = null;
let tapper = null;
const exampleTableContainer = document.querySelector(".js-example-table-container");
const examplesTable = document.createElement("div");
examplesTable.classList.add("js-example-table");
examplesTable.innerHTML = generateTempoTable(tempoDatabase);
exampleTableContainer === null || exampleTableContainer === void 0 ? void 0 : exampleTableContainer.append(examplesTable);
selector.addEventListener("change", () => {
    currentTool = selector.value;
    toolContainer.innerHTML = "";
    renderTool();
});
// Initial render
renderTool();
examplesTable.addEventListener("click", (e) => {
    const target = e.target;
    if (!target || !target.dataset || !target.dataset.tempo)
        return;
    const tempostr = target.dataset.tempo;
    const tempo = parseInt(tempostr, 10);
    if (!isNaN(tempo)) {
        clickToSetTempo(tempo);
    }
});
function clickToSetTempo(tempo) {
    if (currentTool === "metronome") {
        metronome.setTempo(tempo);
    }
    if (currentTool === "tapper") {
        tapper.setTempo(tempo);
    }
}
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
function generateTempoTable(database) {
    let table = `<table class="tempo-table">
    <thead>
      <tr>
        <th>Tempo</th>
        <th>Example Music</th>
      </tr>
    </thead>
    <tbody>`;
    for (const entry of database) {
        table += `<tr>
      <td><strong>${entry.tempoRange}</strong><br/><small>${entry.bpmRange}</small></td>
      <td>
        <strong>Popular:</strong><br/>`;
        for (const pop of entry.examples.popular) {
            table += `<a href="${pop.link}" target="_blank">${pop.title} – ${pop.artist}</a>
        – <span class="tempo-number" data-tempo="${pop.bpm}">${pop.bpm} BPM</span><br/>`;
        }
        table += `<br/><strong>Classical:</strong><br/>`;
        for (const classical of entry.examples.classical) {
            table += `<a href="${classical.link}" target="_blank">${classical.title}</a>
        – <span class="js-set-tempo-number tempo-number" data-tempo="${classical.bpm}">${classical.bpm} BPM</span><br/>`;
        }
        table += `</td></tr>`;
    }
    table += `</tbody></table>`;
    return table;
}
//# sourceMappingURL=tools-main.js.map