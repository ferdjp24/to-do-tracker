class Task {
  constructor(description, deadline, notes) {
    this.title = description;
    this.deadline = deadline;
    this.notes = notes;
    this.isCompleted = false;
  }
}

// const arrayOfTasks = []; // can be useful for sorting feature

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

    // arrayOfTasks.push(newTask); // can be useful for sorting feature

    const descriptionSpan = document.createElement("span");
    descriptionSpan.setAttribute("class", "task-title");
    descriptionSpan.appendChild(document.createTextNode(newTask.title));

    const li = document.createElement("li");
    li.appendChild(descriptionSpan);
    if (newTask.deadline != "") {
      li.appendChild(document.createElement("br"));
      li.appendChild(
        document.createTextNode(
          `Deadline: ${new Date(newTask.deadline)
            .toUTCString()
            .substring(0, 16)}`
        )
      );
    }
    if (newTask.notes != "") {
      li.appendChild(document.createElement("br"));
      li.appendChild(document.createTextNode(`Notes: ${newTask.notes}`));
    }

    li.appendChild(document.createElement("br"));
    const completeBtn = document.createElement("button");
    completeBtn.setAttribute("id", "feature-button");
    completeBtn.innerHTML = "Complete";
    completeBtn.addEventListener("click", (e) => {
      li.setAttribute("class", "completed-task");
      completeBtn.remove();
    });
    li.appendChild(completeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "feature-button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", (e) => {
      li.remove();
    });
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    titleInput.value = "";
    dateInput.value = "";
    notesInput.value = "";
  }
}
