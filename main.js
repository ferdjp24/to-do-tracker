class Task {
  constructor(description, deadline, notes) {
    this.title = description;
    this.deadline = new Date(deadline);
    this.notes = notes;
    this.isCompleted = false;
  }
}

const arrayOfTasks = [];
// DOM Selections
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
    setTimeout(() => {
      msg.innerHTML = "";
      msg.classList.remove("error");
    }, 3000);
  } else {
    const newTask = new Task(
      titleInput.value,
      dateInput.value,
      notesInput.value
    );

    console.log(newTask);

    const descriptionSpan = document.createElement("span");
    descriptionSpan.setAttribute("class", "uncompleted-task");
    descriptionSpan.appendChild(document.createTextNode(newTask.title));

    const li = document.createElement("li");
    li.appendChild(descriptionSpan);
    if (newTask.deadline != "") {
      li.appendChild(document.createElement("br"));
      li.appendChild(
        document.createTextNode(
          `Deadline: ${newTask.deadline.toUTCString().substring(0, 16)}`
        )
      );
    }
    if (newTask.notes != "") {
      li.appendChild(document.createElement("br"));
      li.appendChild(document.createTextNode(`Notes: ${newTask.notes}`));
    }

    taskList.appendChild(li);

    titleInput.value = "";
    dateInput.value = "";
    notesInput.value = "";
  }
}
