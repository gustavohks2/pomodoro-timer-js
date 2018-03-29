$(document).ready(function() {
  "use strict";

  const tasks = JSON.parse(localStorage.getItem("tasks") || null) || [];

  const pomodoroForm = $(".js-add-task");
  const pomodoroTableBody = $(".js-task-table-body");

  const addTask = function(evt) {
    evt.preventDefault();

    const taskName = $(".js-task-name").val().trim();
    const pomodoroCount = $(".js-pomodoro-count").val();

    if (taskName.length < 3) return;

    tasks.push({
      taskName,
      pomodoroCount,
      pomodoroDone: 0,
      pomodoroFinished: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    this.reset();

    renderTasks(pomodoroTableBody, tasks);
  }

  const renderTasks = (tBodyElement, tasks = []) => {

    tBodyElement.html(tasks.map((task, i) => `
        <tr>
          <td class="cell-task-name">${task.taskName}</td>
          <td class="cell-pom-count">${task.pomodoroDone} / ${task.pomodoroCount} pomodoris</td>
          <td class="cell-pom-controls">
          ${task.pomodoroFinished ? '<span class="text-success">Finished</span> |' : `
            <button class="js-task-done btn btn-info" data-id="${i}">Done</button>
            <button class="js-increase-pomodoro btn btn-info" data-id="${i}">+1 Pom</button> 
          `}
            <button class="js-delete-task btn btn-danger" data-id="${i}">Delete Task</button>
          </td>
        </tr>
      `
    ).join("\n"));
  }

  const handleTaskButtonClick = evt => {
    const elClassList = evt.target.classList;
    const elTaskId = evt.target.getAttribute("data-id");

    elClassList.contains("js-task-done") ? finishTask(tasks, elTaskId) :
    elClassList.contains("js-increase-pomodoro") ? increasePomodoro(tasks, elTaskId):
    elClassList.contains("js-delete-task") ? deleteTask(tasks, elTaskId) : null;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(pomodoroTableBody, tasks);
  }

  const handleDoubleClick = function(evt) {
    console.log("asdf");
  }

  const finishTask = (tasks, taskId) => { 
    tasks[taskId].pomodoroFinished = true; 
    tasks[taskId].pomodoroDone = tasks[taskId].pomodoroCount;
  }

  const deleteTask = (tasks, taskId) => { tasks.splice(taskId, 1); }

  const increasePomodoro = (tasks, taskId) => { 
    const limit = tasks[taskId].pomodoroCount;
    
    if (tasks[taskId].pomodoroDone + 1 == limit) {
      tasks[taskId].pomodoroDone++;
      finishTask(tasks, taskId);
      return;
    }

    tasks[taskId].pomodoroDone++;
  }

  pomodoroTableBody.on("click", handleTaskButtonClick);
  pomodoroForm.on("submit", addTask);

  renderTasks(pomodoroTableBody, tasks);
});