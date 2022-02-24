class Task {
  constructor(description, deadline, notes) {
    this.title = description;
    this.deadline = deadline;
    this.notes = notes;
    this.isCompleted = false;
  }
}

let taskList;

if (localStorage.getItem("tasksSorted")) {
  taskList = JSON.parse(localStorage.getItem("tasksSorted"));
} else if (localStorage.getItem("tasks")) {
  taskList = JSON.parse(localStorage.getItem("tasks"));
} else {
  taskList = [];
}

// DOM Selections
const myForm = document.querySelector("#my-form");
const titleInput = document.querySelector("#tasktitle");
const dateInput = document.querySelector("#deadline");
const notesInput = document.querySelector("#notes");
const msg = document.querySelector(".msg");
const ulTasks = document.querySelector("#tasklist");
const sortDateBtn = document.querySelector("#sort-date-btn");
const sortCompBtn = document.querySelector("#sort-comp-btn");
const resetBtn = document.querySelector("#reset-btn");
const sortDateVal = localStorage.getItem("sortDate");
const sortCompVal = localStorage.getItem("sortComp");

// Events
sortDateBtn.addEventListener("click", (e) => {
  if (sortDateVal === "true") {
    localStorage.setItem("sortDate", "false");
    sortDesDeadline();
  } else {
    localStorage.setItem("sortDate", "true");
    sortAscDeadline();
  }
});

sortCompBtn.addEventListener("click", (e) => {
  if (sortCompVal === "true") {
    localStorage.setItem("sortComp", "false");
    sortComplete();
  } else {
    localStorage.setItem("sortComp", "true");
    sortIncomplete();
  }
});

// resetBtn.addEventListener("click", (e) => {
//   localStorage.removeItem("tasksSorted");
//   localStorage.removeItem("sortDate");
//   localStorage.removeItem("sortComp");
//   location.reload();
// });

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
    taskList.push(
      new Task(titleInput.value, dateInput.value, notesInput.value)
    );
    console.log(taskList);
    titleInput.value = "";
    dateInput.value = "";
    notesInput.value = "";
    localStorage.setItem("tasks", JSON.stringify(taskList));
    location.reload();
  }
}

// displaying stored taskList
const liOutput = (description, deadline, notes, isCompleted) => {
  const li = document.createElement("li");

  const descSpan = document.createElement("span");
  descSpan.setAttribute("class", "task-title");
  descSpan.appendChild(document.createTextNode(description));
  li.appendChild(descSpan);

  if (deadline !== "") {
    li.appendChild(document.createElement("br"));
    li.appendChild(
      document.createTextNode(
        `Deadline: ${new Date(deadline).toUTCString().substring(0, 16)}`
      )
    );
  }
  if (notes !== "") {
    li.appendChild(document.createElement("br"));
    li.appendChild(document.createTextNode(`Notes: ${notes}`));
  }

  if (isCompleted) {
    li.setAttribute("class", "completed-task");
    li.appendChild(document.createElement("br"));
  } else {
    li.appendChild(document.createElement("br"));
    const completeBtn = document.createElement("button");
    completeBtn.setAttribute("id", "feature-button");
    completeBtn.innerHTML = "Complete";
    completeBtn.addEventListener("click", (e) => {
      completeBtn.remove();
      // updating taskList
      const completedTask = taskList.find((task) => task.title === description);
      completedTask.isCompleted = true;
      localStorage.setItem("tasks", JSON.stringify(taskList));
      location.reload();
    });
    li.appendChild(completeBtn);
  }
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("id", "feature-button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.addEventListener("click", (e) => {
    li.remove();
    // updating taskList
    taskList = taskList.filter((task) => task.title !== description);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  });
  li.appendChild(deleteBtn);

  return li;
};

const ulOutput = () => {
  taskList.forEach((task) => {
    ulTasks.append(
      liOutput(task.title, task.deadline, task.notes, task.isCompleted)
    );
  });
};

const sortAscDeadline = () => {
  taskList.sort((a, b) => a.deadline > b.deadline);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  location.reload();
};

const sortDesDeadline = () => {
  taskList.sort((a, b) => a.deadline < b.deadline);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  location.reload();
};

const sortComplete = () => {
  taskList.sort((a, b) => a.isCompleted > b.isCompleted);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  location.reload();
};

const sortIncomplete = () => {
  taskList.sort((a, b) => a.isCompleted < b.isCompleted);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  location.reload();
};

ulOutput();
