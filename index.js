const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));

if (list) {
  list.forEach((task) => {
    updateNote(task);
  });
}
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  updateNote();
});
function updateNote(task) {
  let newTask = inputEl.value;
  if (task) {
    newTask = task.name;
  }
  const liEl = document.createElement("li");
  if (task && task.checked) {
    liEl.classList.add("checked");
  }
  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fas fa-check-square">`;
  liEl.appendChild(checkBtnEl);
  const trashEl = document.createElement("div");
  trashEl.innerHTML = `<i class="fas fa-trash">`;
  liEl.appendChild(trashEl);
  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateList();
  });
  trashEl.addEventListener("click", () => {
    liEl.remove();
    updateList();
  });

  updateList();
}

function updateList() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
