const inputPendingToDo = document.querySelector(".pendingTodo");
const formToDo = document.querySelector(".js-toDoForm");
const pendingUl = document.querySelector(".pending");
const finishedUl = document.querySelector(".finished");
let pendingListArray = [];
let finishedListArray = [];

function drawPendingList(value) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const toFinBtn = document.createElement("button");
  const length = pendingListArray.length + 1;
  
  delBtn.innerText = "❌";
  toFinBtn.innerText = "✔️";
  delBtn.addEventListener("click", deleteToDo);
  toFinBtn.addEventListener("click", drawFinishedList);
  toFinBtn.addEventListener("click", deleteToDo);

  //showing in html
  span.innerText = value;
  
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(toFinBtn);
  pendingUl.appendChild(li);
  li.id = length;
  //saving
  const valueList = {
    value: value,
    index: length
  };
  pendingListArray.push(valueList);
  savePending();
}

function toPending(event) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const toFinBtn = document.createElement("button");
  
  const length = pendingListArray.length + 1;
  delBtn.innerText = "❌";
  toFinBtn.innerText = "✔️";
  delBtn.addEventListener("click", deleteToDo);
  toFinBtn.addEventListener("click", drawFinishedList);
  toFinBtn.addEventListener("click", deleteToDo);

  //showing in html
  span.innerText = event.target.parentNode.childNodes[0].innerText;
  
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(toFinBtn);
  pendingUl.appendChild(li);
  li.id = length;
  //saving
  const valueList = {
    value: event.target.parentNode.childNodes[0].innerText,
    index: length
  };
  pendingListArray.push(valueList);
  savePending();
}

function drawFinishedList(event) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const toPenBtn = document.createElement("button");
  
  const length = finishedListArray.length + 1;
  delBtn.innerText = "❌";
  toPenBtn.innerText = "👈";
  delBtn.addEventListener("click", deleteToDo2);
  toPenBtn.addEventListener("click", toPending);
  toPenBtn.addEventListener("click", deleteToDo2);

  span.innerText = event.target.parentNode.childNodes[0].innerText;
  
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(toPenBtn);
  finishedUl.appendChild(li);
  li.id = length;

  const valueList = {
    value: event.target.parentNode.childNodes[0].innerText,
    index: length
  };
  finishedListArray.push(valueList);
  saveFinished();
}

function drawFinishedListAtRefresh(value) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const toPenBtn = document.createElement("button");
  
  const length = finishedListArray.length + 1;
  delBtn.innerText = "❌";
  toPenBtn.innerText = "👈";
  delBtn.addEventListener("click", deleteToDo2);
  toPenBtn.addEventListener("click", toPending);
  toPenBtn.addEventListener("click", deleteToDo2);

  span.innerText = value;
  
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(toPenBtn);
  finishedUl.appendChild(li);
  li.id = length;

  const valueList = {
    value: value,
    index: length
  };
  finishedListArray.push(valueList);
  saveFinished();
}

function savePending() {
  localStorage.setItem("pending", JSON.stringify(pendingListArray));
}

function saveFinished() {
  localStorage.setItem("finished", JSON.stringify(finishedListArray));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingUl.removeChild(li);
  const cleanToDos = pendingListArray.filter(function (toDo) {
    console.log(toDo.index, parseInt(li.id));
    return toDo.index !== parseInt(li.id);
  });
  pendingListArray = cleanToDos;
  savePending();
}

function deleteToDo2(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedUl.removeChild(li);
  const cleanToDos = finishedListArray.filter(function (toDo) {
    console.log(toDo.index, parseInt(li.id));
    return toDo.index !== parseInt(li.id);
  });
  finishedListArray = cleanToDos;
  saveFinished();
}

function loadPending() {
  const pendingList = localStorage.getItem("pending");
  const parsed = JSON.parse(pendingList);
  if (pendingList) {
    parsed.forEach(function (parse) {
      drawPendingList(parse.value);
    });
  }
}

function loadFinished() {
  const finishedList = localStorage.getItem("finished");
  const parsed = JSON.parse(finishedList);
  if (finishedList) {
    parsed.forEach(function (parse) {
      drawFinishedListAtRefresh(parse.value);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault(); //이거 안하면 페이지 새로고침됨
  const currentValue = inputPendingToDo.value;
  drawPendingList(currentValue);
  inputPendingToDo.value = "";
}

function init() {
  loadPending();
  loadFinished();

  formToDo.addEventListener("submit", handleSubmit);
}

init();
