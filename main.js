let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAllButton = document.querySelector(".delete-all");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if There are Tasks in Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
    showNotification("Task added successfully!", "success");
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    const taskId = e.target.parentElement.parentElement.getAttribute("data-id");
    deleteTaskWith(taskId);
    e.target.parentElement.parentElement.remove();
    showNotification("Task deleted successfully!", "success");
  }

  // Edit/Save Button
  if (e.target.classList.contains("edit")) {
    const taskElement = e.target.parentElement.parentElement;
    const taskId = taskElement.getAttribute("data-id");
    const taskText = taskElement.querySelector(".task-text");

    if (e.target.textContent === "Edit") {
      // Change to Save mode
      e.target.textContent = "Save";

      // Create an input field for editing
      const input = document.createElement("input");
      input.type = "text";
      input.value = taskText.textContent;
      input.className = "edit-input";

      // Replace task text with input
      taskText.replaceWith(input);
    } else {
      // Save changes
      const input = taskElement.querySelector(".edit-input");
      const updatedText = input.value;

      // Update task in the array
      arrayOfTasks = arrayOfTasks.map((task) =>
        task.id == taskId ? { ...task, title: updatedText } : task
      );

      // Save changes to localStorage
      addDataToLocalStorageFrom(arrayOfTasks);

      // Revert to Edit mode
      e.target.textContent = "Edit";

      // Replace input with updated text
      const updatedTaskText = document.createElement("span");
      updatedTaskText.textContent = updatedText;
      updatedTaskText.className = "task-text";
      input.replaceWith(updatedTaskText);

      showNotification("Task edited successfully!", "success");
    }
  }

  // Toggle Completed For The Task
  if (e.target.classList.contains("task")) {
    const taskId = e.target.getAttribute("data-id");

    // Toggle the class in the DOM
    e.target.classList.toggle("done");

    // Update the `completed` status in the array
    toggleStatusTaskWith(taskId);

    showNotification("Task status updated successfully!", "success");
  }
});

// Add Task to Array
function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

// Add Tasks to Page
function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";

  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", task.id);

    // Check If Task is Done
    if (task.completed) {
      div.classList.add("done");
    }

    // Create Task Text
    let taskText = document.createElement("span");
    taskText.textContent = task.title;
    taskText.className = "task-text";
    div.appendChild(taskText);

    // Create Buttons Container
    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "butns";

    // Create Edit Button
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit";
    buttonsDiv.appendChild(editButton);

    // Create Delete Button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "del";
    buttonsDiv.appendChild(deleteButton);

    // Append Buttons Container to the Main Div
    div.appendChild(buttonsDiv);

    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

// Add Data to Local Storage
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

// Get Data from Local Storage
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

// Delete Task by ID
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

// Toggle Task Status in the Array
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

// Add Delete All Button Functionality
deleteAllButton.onclick = function () {
  // Clear the array of tasks
  arrayOfTasks = [];

  // Remove tasks from localStorage
  localStorage.removeItem("tasks");

  // Clear tasks from the page
  tasksDiv.innerHTML = "";

  showNotification("All tasks deleted successfully!", "success");
};

// Notification Function
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
