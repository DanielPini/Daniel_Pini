import projects from "/js/data/projectsDB.js";

const projectContainer = document.querySelector(".projects"); //as HTMLElement | null;
if (!projectContainer) {
  throw new Error("Project container not found");
}
projectContainer.classList.add("project-container");
console.log("hello");
projects.forEach((work) => {
  const project = document.createElement("div");
  project.classList.add("project");
  project.style.aspectRatio = "16 / 9";
  const name = document.createElement("h2");
  name.classList.add("project-name");

  // Add type of project
  const type = document.createElement("p");
  type.classList.add("project-type");
  type.innerText = work.type;

  // Add image of project
  const video = document.createElement("video");
  video.classList.add("project-video");
  video.setAttribute("src", `/assets/photos/${work.video}`);
  video.setAttribute("alt", `${work.name} screenshot`);
  name.innerText = work.name;

  // Add stack of project
  const stack = document.createElement("div");
  stack.classList.add("project-stack");
  work.stack.forEach((element) => {
    const image = document.createElement("img");
    image.setAttribute("src", `/assets/icons/${element}.svg`);
    image.setAttribute("alt", element);
    stack.appendChild(image);
  });

  const description = document.createElement("div");
  description.classList.add("project-description");
  const p = document.createElement("p");
  description.append(p);
  p.textContent = work.description;

  console.log(p);

  project.append(video, description);

  projectContainer.append(project);
});

const videos = document.querySelectorAll("video");

videos.forEach((video) => {
  video.addEventListener("mouseenter", () => {
    video.play();
    video.playbackRate = 1.3;
    video.loop = true;
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});
