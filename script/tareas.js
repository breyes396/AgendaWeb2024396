document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("todo-items");
    const addTaskBtn = document.getElementById("add-task-btn");
    const formContainer = document.getElementById("todo-form-modal");
    const form = document.getElementById("todo-form");
    const cancelTaskBtn = document.getElementById("cancel-task-btn");
    const submitTaskBtn = document.getElementById("submit-task-btn");
    const confirmModal = document.getElementById("confirm-modal");
    const confirmCompleteBtn = document.getElementById("confirm-complete-btn");
    const cancelCompleteBtn = document.getElementById("cancel-complete-btn");

    const deleteConfirmModal = document.getElementById("delete-confirm-modal");
    const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
    const cancelDeleteBtn = document.getElementById("cancel-delete-btn");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentFilter = "all"; 

    function renderTasks() {
        taskList.innerHTML = "";

        let filteredTasks = tasks.filter(task => {
            if (currentFilter === "pending") {
                return !task.completed; 
            } else if (currentFilter === "completed") {
                return task.completed; 
            }
            return true; 
        });

        filteredTasks.sort((a, b) => {
            const priorityOrder = { "alta": 1, "media": 2, "baja": 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        filteredTasks.forEach((task, filteredIndex) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");

            const realIndex = tasks.findIndex(t => 
                t.name === task.name && 
                t.description === task.description && 
                t.duration === task.duration && 
                t.priority === task.priority &&
                t.completed === task.completed
            );

            const taskContent = `
                <div class="task-content">
                    <h3>${task.name}</h3>
                    <p>${task.description}</p>
                    <p>Duración: ${task.duration} horas</p>
                    <p>Prioridad: ${task.priority}</p>
                </div>`;

            const taskActions = task.completed
                ? `<span class="completed-msg">Tarea completada</span>` 
                : `
                <button class="complete-btn" data-index="${realIndex}">Marcar como completada</button>
                <button class="edit-btn" data-index="${realIndex}">Editar</button>
                `;

            taskItem.innerHTML = `
                ${taskContent}
                <div class="task-actions">
                    ${taskActions}
                    <button class="delete-btn" data-index="${realIndex}">Eliminar</button>
                </div>
            `;
            
            if (task.completed) {
                taskItem.classList.add("completed");
                taskItem.querySelector(".task-content").style.textDecoration = "line-through";
            }

            taskList.appendChild(taskItem);
        });

        addEventListenersToButtons();
    }

    function addEventListenersToButtons() {
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showCompleteModal(index);
            });
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                editTask(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showDeleteModal(index);
            });
        });
    }

    addTaskBtn.addEventListener("click", function () {
        form.reset();
        submitTaskBtn.textContent = "Guardar Tarea";
        submitTaskBtn.removeAttribute('data-task-index');
        formContainer.style.display = "flex"; 
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const taskName = document.getElementById("task-name").value;
        const taskDescription = document.getElementById("task-description").value;
        const taskDuration = document.getElementById("task-duration").value;
        const taskPriority = document.getElementById("task-priority").value;

        const newTask = {
            name: taskName,
            description: taskDescription,
            duration: taskDuration,
            priority: taskPriority,
            completed: false, 
        };

        if (submitTaskBtn.textContent === "Guardar Tarea") {
            tasks.push(newTask);
        } else {
            const taskIndex = parseInt(submitTaskBtn.getAttribute("data-task-index"));
            tasks[taskIndex] = newTask; 
        }

        localStorage.setItem("tasks", JSON.stringify(tasks)); 
        renderTasks();
        formContainer.style.display = "none"; 
    });

    function editTask(index) {
        const task = tasks[index];

        document.getElementById("task-name").value = task.name;
        document.getElementById("task-description").value = task.description;
        document.getElementById("task-duration").value = task.duration;
        document.getElementById("task-priority").value = task.priority;

        submitTaskBtn.textContent = "Actualizar Tarea";
        submitTaskBtn.setAttribute("data-task-index", index.toString()); 

        formContainer.style.display = "flex"; 
    }

    function showCompleteModal(index) {
        confirmModal.style.display = "flex";
        confirmCompleteBtn.setAttribute("data-task-index", index.toString());
    }

    confirmCompleteBtn.addEventListener("click", function () {
        const taskIndex = parseInt(confirmCompleteBtn.getAttribute("data-task-index"));
        tasks[taskIndex].completed = true; 
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
        renderTasks();
        confirmModal.style.display = "none"; 
    });

    cancelCompleteBtn.addEventListener("click", function () {
        confirmModal.style.display = "none"; 
    });

    function showDeleteModal(index) {
        deleteConfirmModal.style.display = "flex"; 
        confirmDeleteBtn.setAttribute("data-task-index", index.toString()); 
    }

    confirmDeleteBtn.addEventListener("click", function () {
        const taskIndex = parseInt(confirmDeleteBtn.getAttribute("data-task-index"));
        tasks.splice(taskIndex, 1); 
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
        renderTasks();
        deleteConfirmModal.style.display = "none"; 
    });

    cancelDeleteBtn.addEventListener("click", function () {
        deleteConfirmModal.style.display = "none"; 
    });

    cancelTaskBtn.addEventListener("click", function () {
        formContainer.style.display = "none"; 
    });

    document.getElementById("task-filter").addEventListener("change", function (e) {
        currentFilter = e.target.value;
        renderTasks();
    });

    window.editTask = editTask;
    window.showCompleteModal = showCompleteModal;
    window.showDeleteModal = showDeleteModal;

    renderTasks();
});