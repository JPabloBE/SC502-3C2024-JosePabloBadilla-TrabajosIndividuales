document.addEventListener("DOMContentLoaded", function () {
  let isEditMode = false;
  let edittingId;
  const tasks = [
    {
      id: 1,
      title: "Complete project report",
      description: "Prepare and submit the project report",
      dueDate: "2024-12-01",
      comments: [],
    },
    {
      id: 2,
      title: "Team Meeting",
      description: "Get ready for the season",
      dueDate: "2024-12-01",
      comments: [],
    },
    {
      id: 3,
      title: "Code Review",
      description: "Check partners code",
      dueDate: "2024-12-01",
      comments: [],
    },
    {
      id: 4,
      title: "Deploy",
      description: "Check deploy steps",
      dueDate: "2024-12-01",
      comments: [],
    },
  ];

  function loadTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const taskCard = document.createElement("div");
      taskCard.className = "col-md-4 mb-3";
      taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
                    <div class="comments-section" id="comments-${task.id}">
                        <h6>Comentarios/Aportaciones</h6>
                        <ul class="list-group mb-3" id="comment-list-${task.id}"></ul>
                        <input type="text" class="form-control mb-2" id="comment-input-${task.id}" placeholder="Escribe un comentario">
                        <button class="btn btn-primary btn-sm add-comment" data-id="${task.id}">Añadir comentario</button>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Eliminar</button>
                </div>
            </div>
            `;
      taskList.appendChild(taskCard);
      loadComments(task.id);
    });

    document.querySelectorAll(".add-comment").forEach((button) => {
      button.addEventListener("click", addComment);
    });
    document.querySelectorAll(".edit-task").forEach((button) => {
      button.addEventListener("click", handleEditTask);
    });
    document.querySelectorAll(".delete-task").forEach((button) => {
      button.addEventListener("click", handleDeleteTask);
    });
  }

  // Modificaciones.

  // Subir comentario.
  function loadComments(taskId) {
    const commentList = document.getElementById(`comment-list-${taskId}`);
    commentList.innerHTML = "";
    const task = tasks.find((t) => t.id === taskId);
    task.comments.forEach((comment, index) => {
      const commentItem = document.createElement("li");
      commentItem.className =
        "list-group-item d-flex justify-content-between align-items-center";
      commentItem.innerHTML = `
              ${comment} 
              <button class="btn btn-danger btn-sm ms-2 delete-comment" data-task-id="${taskId}" data-index="${index}">
                  Eliminar
              </button>`;
      commentList.appendChild(commentItem);
    });

    // Botón para eliminar el comentario.
    document.querySelectorAll(".delete-comment").forEach((button) => {
      button.addEventListener("click", deleteComment);
    });
  }

  // Agregar comentario.

  function addComment(event) {
    const taskId = parseInt(event.target.dataset.id);
    const commentInput = document.getElementById(`comment-input-${taskId}`);
    const newComment = commentInput.value.trim();
    if (newComment) {
      const task = tasks.find((t) => t.id === taskId);
      task.comments.push(newComment);
      loadComments(taskId);
      commentInput.value = "";
    }
  }

  // Eliminar comentario.

  function deleteComment(event) {
    const taskId = parseInt(event.target.dataset.taskId);
    const commentIndex = parseInt(event.target.dataset.index);
    const task = tasks.find((t) => t.id === taskId);
    task.comments.splice(commentIndex, 1);
    loadComments(taskId);
  }

  function handleEditTask(event) {
    const taskId = parseInt(event.target.dataset.id);
    const task = tasks.find((t) => t.id === taskId);
    document.getElementById("task-title").value = task.title;
    document.getElementById("task-desc").value = task.description;
    document.getElementById("due-date").value = task.dueDate;
    isEditMode = true;
    edittingId = taskId;
    const modal = new bootstrap.Modal(document.getElementById("taskModal"));
    modal.show();
  }

  function handleDeleteTask(event) {
    const id = parseInt(event.target.dataset.id);
    const index = tasks.findIndex((t) => t.id === id);
    tasks.splice(index, 1);
    loadTasks();
  }

  document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;
    const dueDate = document.getElementById("due-date").value;

    if (isEditMode) {
      const task = tasks.find((t) => t.id === edittingId);
      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
    } else {
      const newTask = {
        id: tasks.length + 1,
        title: title,
        description: description,
        dueDate: dueDate,
        comments: [],
      };
      tasks.push(newTask);
    }
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("taskModal")
    );
    modal.hide();
    loadTasks();
  });

  document
    .getElementById("taskModal")
    .addEventListener("show.bs.modal", function () {
      if (!isEditMode) document.getElementById("task-form").reset();
    });

  document
    .getElementById("taskModal")
    .addEventListener("hidden.bs.modal", function () {
      edittingId = null;
      isEditMode = false;
    });

  loadTasks();
});
