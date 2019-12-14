const greetingBlock = document.querySelector(
  ".js-greeting"
);
const greetingForm = greetingBlock.querySelector("form");
const greetingInput = greetingForm.querySelector("input");
const greetingText = greetingBlock.querySelector("div");

function handleNameChange(e) {
  greetingText.classList.remove("show");
  greetingForm.classList.add("show");
}

function handleNameSubmit(e) {
  e.preventDefault();
  const newName = greetingInput.value;
  localStorage.setItem("name", newName);
  paintName(newName);
  greetingInput.value = "";
  greetingForm.classList.remove("show");
}

function paintName(name) {
  greetingText.innerText = `Have a great day, ${name}.`;
  greetingText.classList.add("show");
}

function init() {
  const savedName = localStorage.getItem("name");
  if (savedName) {
    paintName(savedName);
  } else {
    greetingForm.classList.add("show");
  }
}

init();
greetingForm.addEventListener("submit", handleNameSubmit);
greetingText.addEventListener("click", handleNameChange);
