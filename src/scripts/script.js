let currentColumn = '';
    const modal = document.getElementById('task-modal');
    const input = document.getElementById('task-input');
    const taskPriority = document.getElementById('task-priority').value;

    function openModal(column) {
      currentColumn = column;
      modal.showModal();
      input.value = '';
      input.focus();
    }

function showModal() {
    const modal = document.querySelector('.task-modal');
    modal.style.display = 'block'; // Show the modal
}

function closeModal() {
      modal.close();
    }

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
    
    function addTask() {
        const input = document.getElementById('task-input');
        const taskText = input.value.trim();
        const taskPriority = document.getElementById('task-priority').value;
        if (!taskText) return;
        
        const taskElement = createTaskElement(taskText, taskPriority);
        document.querySelector(`#${currentColumn} .tasks`).appendChild(taskElement);
        closeModal();
    }
    
    function createTaskElement(taskText, taskPriority) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.draggable = true;
        taskDiv.setAttribute('data-priority', taskPriority);
        taskDiv.addEventListener('dragstart', drag);
        taskDiv.addEventListener('dragend', dragEnd);

        const taskContent = document.createElement('div');
        taskContent.style.display = 'flex';
        taskContent.style.alignItems = 'right';
    
        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = taskPriority;
        prioritySpan.className = 'priority';
        prioritySpan.style.right = '10px';
        prioritySpan.style.position = 'relative';
    
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = `🗑️`;
        deleteBtn.onclick = function() {
            taskDiv.remove();
        };

        taskContent.appendChild(prioritySpan);
        taskContent.appendChild(deleteBtn);
    
        taskDiv.appendChild(textSpan);
        taskDiv.appendChild(taskContent);
        return taskDiv;
    }
    
    function sortByPriority() {
        document.querySelectorAll('.column').forEach(column => {
            const tasksContainer = column.querySelector('.tasks');
            const tasks = Array.from(tasksContainer.children);
            
            tasks.sort((a, b) => {
                return Number(a.getAttribute('data-priority')) - Number(b.getAttribute('data-priority'));
            });
    
            tasks.forEach(task => tasksContainer.appendChild(task));
        });
    }
    
function allowDrop(event) {
    event.preventDefault();
    const targetTask = event.target.closest('.task');
    if (targetTask) {
      targetTask.classList.add('drag-over');
    }
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add("dragging");
}

function dragEnd(event) {
      event.target.classList.remove("dragging");
      document.querySelectorAll('.task').forEach(task => task.classList.remove('drag-over'));
}

function drop(event) {
    event.preventDefault();
    const draggedTask = document.querySelector(".dragging");
    const dropTarget = event.target.closest(".task") || event.target.closest(".tasks");
      
    if (dropTarget.classList.contains("tasks")) {
        dropTarget.appendChild(draggedTask);
    } else {
        dropTarget.parentNode.insertBefore(draggedTask, dropTarget.nextSibling);
    }
    draggedTask.classList.remove("dragging");
}

function toggleMenu() {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".overlay");

  if (!burger || !navLinks || !overlay) return;

  navLinks.classList.toggle("nav-active");
  burger.classList.toggle("toggle");
  overlay.style.display = navLinks.classList.contains("nav-active") ? "block" : "none";
}


  document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger");
    const overlay = document.querySelector(".overlay");
  
    if (!burger || !navLinks || !overlay) return; // Если элементов нет — ничего не делать

    overlay.addEventListener('click', () => {
      navLinks.classList.remove('nav-active');
      burger.classList.remove('toggle');
      overlay.style.display = 'none'; // Hide overlay
    });
  
    burger.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
  });

  function getTaskList(status) {
    return {
        'tasks': elements.tasksList,
        'in-work': elements.inWorkList,
        'completed': elements.completed
    }[status];
}

document.getElementById('sortAscBtn').addEventListener('click', () => sortTasks(true));
document.getElementById('sortDescBtn').addEventListener('click', () => sortTasks(false));
document.getElementById('sortPriorityBtn').addEventListener('click', sortByPriority);

function sortTasks(isAscending) {
    document.querySelectorAll('.column').forEach(column => {
        const tasksContainer = column.querySelector('.tasks');
        const tasks = Array.from(tasksContainer.children);
        
        tasks.sort((a, b) => {
            return isAscending 
                ? a.textContent.localeCompare(b.textContent)
                : b.textContent.localeCompare(a.textContent);
        });

        tasks.forEach(task => tasksContainer.appendChild(task));
    });
}


function refreshTaskBoard() {
    // Очищаем все колонки
    elements.todoList.innerHTML = '';
    elements.inProgressList.innerHTML = '';
    elements.doneList.innerHTML = '';

    // Перебираем и добавляем задачи в соответствующие колонки снова
    tasks.forEach(addTaskToBoard);
}

// Загрузка задач при загрузке страницы
window.onload = () => {
    tasks.forEach(addTaskToBoard);
};