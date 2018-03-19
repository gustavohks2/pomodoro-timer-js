(function() {
  "use strict";

  const tasks = [];

  const pomodoroForm = document.querySelector(".js-add-task");
  const pomodoroTableBody = document.querySelector(".js-task-table-body");

  const addTask = function(evt) {
    evt.preventDefault();

    const taskName = this.querySelector(".js-task-name").value;
    const pomodoroCount = this.querySelector(".js-pomodoro-count").value;

    tasks.push({
      taskName,
      pomodoroCount,
      pomodoroDone: 0,
      pomodoroFinished: false
    });

    this.reset();

    renderTasks(pomodoroTableBody, tasks);
  }

  const renderTasks = function(tBodyElement, tasks = []) {
    tBodyElement.innerHTML = tasks.map((task, i) => `
        <tr>
          <td class="cell-task-name">${task.taskName}</td>
          <td class="cell-pom-count">${task.pomodoroDone} / ${task.pomodoroCount} pomodoris</td>
          <td class="cell-pom-controls">
          ${task.pomodoroFinished ? 'Finished |' : `
            <button class="js-task-done" data-id="${i}">Done</button>
            <button class="js-increase-pomodoro" data-id="${i}">+1 Pom</button> 
          `}
            <button class="js-delete-task" data-id="${i}">Delete Task</button>
          </td>
        </tr>
      `
    ).join("\n");
  }

  const handleTaskButtonClick = function(evt) {
    const elClassList = evt.target.classList;
    const elTaskId = evt.target.getAttribute("data-id");

    elClassList.contains("js-task-done") ? finishTask(tasks, elTaskId) :
    elClassList.contains("js-increase-pomodoro") ? increasePomodoro(tasks, elTaskId):
    elClassList.contains("js-delete-task") ? deleteTask(tasks, elTaskId) : null;

    renderTasks(pomodoroTableBody, tasks);
  }

  const finishTask = function(tasks, taskId) { tasks[taskId].pomodoroFinished = true; }
  const increasePomodoro = function(tasks, taskId) { tasks[taskId].pomodoroDone++; }
  const deleteTask = function(tasks, taskId) { tasks.splice(taskId, 1) }

  pomodoroTableBody.addEventListener("click", handleTaskButtonClick);
  pomodoroForm.addEventListener("submit", addTask);

})();