const toDoContainer = document.querySelector(".js-to-do");
const toDoForm = toDoContainer.querySelector("form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = toDoContainer.querySelector("ul");

const toDoTemp = [];

function updateHtmlId() {
  const items = toDoList.querySelectorAll("li");
  if (items) {
    items.forEach((item, index) => (item.id = index + 1));
  }
}

function tempDelete(id) {
  toDoTemp.splice(id - 1, 1);
}

function handleDelete(e) {
  const targetItem = e.target.parentNode;
  const id = Number(targetItem.id);
  toDoList.removeChild(targetItem);
  updateHtmlId();
  tempDelete(id);
  saveToDo();
}

function saveToDo() {
  localStorage.setItem("todo", JSON.stringify(toDoTemp));
}

function paintToDo(item) {
  const li = document.createElement("li");
  li.innerText = item;
  const newId = toDoList.childElementCount + 1;
  li.id = newId;
  const btn = document.createElement("button");
  btn.innerText = "❌";
  btn.addEventListener("click", handleDelete);
  li.appendChild(btn);
  toDoList.appendChild(li);
  toDoTemp.push(item);
  saveToDo();
}

function handleToDoSubmit(e) {
  e.preventDefault();
  const toDoItem = toDoInput.value;
  toDoInput.value = "";
  paintToDo(toDoItem);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("todo");
  if (loadedToDos) {
    const items = JSON.parse(loadedToDos);
    items.forEach(item => paintToDo(item));
  }
}

function init() {
  loadToDos();
}

init();
toDoForm.addEventListener("submit", handleToDoSubmit);
