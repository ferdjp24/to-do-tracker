class Task {
  constructor(description, deadline, notes) {
    this.title = description;
    this.deadline = deadline;
    this.notes = notes;
  }
}

const myForm = document.querySelector("#my-form");
const titleInput = document.querySelector("#tasktitle");
const dateInput = document.querySelector("#deadline");
const notesInput = document.querySelector("#notes");
const msg = document.querySelector(".msg");
const taskList = document.querySelector("#tasklist");

myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (titleInput.value === "") {
    msg.classList.add("error");
    msg.innerHTML = "Please enter a description for the task";
    setTimeout(() => msg.remove(), 3000);
  } else {
    const newTask = new Task(
      titleInput.value,
      dateInput.value,
      notesInput.value
    );

    const li = document.createElement("li");
    li.appendChild(document.createTextNode(newTask));
    console.log(li);
  }
}

console.log(notesInput.value);
