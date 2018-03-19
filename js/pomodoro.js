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
    // code...
  }

  pomodoroForm.addEventListener("submit", addTask);

})();