const SKILLS = {
  frontend: [
    ["HTML5", "Semantic, accessible structure"],
    ["CSS3", "Grid/Flex, responsive theming"],
    ["JavaScript", "Modules, async, profiling"],
    ["React", "Component/state patterns"],
  ],
  gameplay: [
    ["Custom JS Engine", "Loop, entity/state mgmt"],
    ["Howler", "Audio cues & timeline sync"],
    ["State Machines", "Flow transitions"],
  ],
  performance: [
    ["Web Vitals", "LCP/CLS diagnostics"],
    ["Bundling", "Code splitting strategy"],
    ["Automation", "Scripts & tooling"],
    ["Profiling", "Runtime & memory"],
  ],
  backend: [
    ["WordPress", "Template + hook refactors"],
    ["PHP", "Custom logic & integration"],
    ["MySQL", "Query/index optimization"],
    ["Node.js", "Backend architecture, routing, middleware"],
  ],
  workflow: [
    ["Git", "Branching & version control"],
    ["Coordination", "Issue/task tracking"],
    ["A11y Auditing", "WCAG compliance checks"],
    ["CI/CD", "Planned pipeline gating"],
  ],
};

function renderSkills() {
  const host = document.querySelector("#skills .skills-cats");
  if (!host) return;
  host.innerHTML = Object.entries(SKILLS)
    .map(([group, items]) => {
      const title = group.charAt(0).toUpperCase() + group.slice(1);
      const lis = items
        .map(([label, tip]) => `<li data-t="${tip}">${label}</li>`)
        .join("");
      return `<div class="skill-group"><h3>${title}</h3><ul class="skill-badges">${lis}</ul></div>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", renderSkills);
