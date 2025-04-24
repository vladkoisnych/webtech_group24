const content = document.getElementById("content");
const options = document.getElementById("options");
const backButton = document.getElementById("back-button");

const historyStack = [];

const pages = {
  start: {
    title: "Begin Your Journey",
    text: "You stand at the edge of a mysterious and enchanted forest. Do you enter or walk away?",
    choices: [
      { text: "Enter the forest", next: "forest" },
      { text: "Walk away", next: "fail" },
    ],
  },
  forest: {
    title: "The Forest Path",
    text: "You continue down the path and encounter a fork in the road where the path separates.",
    choices: [
      { text: "Take the left path", next: "cave" },
      { text: "Take the right path", next: "trap" },
    ],
  },
  cave: {
    title: "Hidden Cave",
    text: "Inside a cave you find a treasure chest guarded by a riddle.",
    choices: [
      { text: "Answer the riddle", next: "win" },
      { text: "Ignore it and leave", next: "fail" },
    ],
  },
  trap: {
    title: "It's a Trap!",
    text: "You fell into a pit, but notice a dark and scary narrow tunnel leading out.",
    choices: [
      { text: "Crawl through the tunnel", next: "escapeTunnel" },
      { text: "Wait and shout for help", next: "fail" },
    ],
  },
  escapeTunnel: {
    title: "Secret Passage",
    text: "You crawl through the dark tunnel, eventually emerging into a hidden chamber filled with an ancient artifact and a lever beside it.",
    choices: [
      { text: "Take the artifact and escape", next: "win2" },
      { text: "Pull old lever", next: "fail" },
    ],
  },
  fail: {
    title: "You Failed",
    text: "Unfortunately, your story has come to an end. Try again?",
    choices: [
      { text: "Retry", next: "start" }],
  },
  win: {
    title: "Congratulations!",
    text: "You answered correctly and found the ancient artifact in the treasure. You win!",
    choices: [
      { text: "Play Again", next: "start" }],
  },
  win2: {
    title: "Triumphant Escape!",
    text: "You took the artifact and escaped through the forest undetected. You win!",
    choices: [
      { text: "Play Again", next: "start" }],
  },
};

function renderPage(pageKey) {
  const page = pages[pageKey];
  if (!page) return;

  content.innerHTML = `<h2>${page.title}</h2><p>${page.text}</p>`;
  options.innerHTML = "";

  page.choices.forEach(choice => {
    const link = document.createElement("a");
    link.href = `#${choice.next}`;
    link.textContent = choice.text;

    link.addEventListener("click", () => {
      historyStack.push(currentPage);
      currentPage = choice.next;
      renderPage(currentPage);
    });

    options.appendChild(link);
  });

  const isEndingPage = ["fail", "win", "win2"].includes(pageKey);
  backButton.style.display = (!isEndingPage && historyStack.length > 0) ? "inline" : "none";
}

let currentPage = "start";
renderPage(currentPage);

backButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (historyStack.length > 0) {
    currentPage = historyStack.pop();
    renderPage(currentPage);
  }
});
