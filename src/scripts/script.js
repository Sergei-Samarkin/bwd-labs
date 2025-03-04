let currentColumn = '';
    const modal = document.getElementById('task-modal');
    const input = document.getElementById('task-input');

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
      const taskText = input.value.trim();
      if (taskText) {
        const taskDiv = createTaskElement(taskText);
        document.querySelector(`#${currentColumn} .tasks`).appendChild(taskDiv);
        closeModal();
      }
    }

function createTaskElement(taskText) {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task';
      taskDiv.draggable = true;
      taskDiv.addEventListener('dragstart', drag);
      taskDiv.addEventListener('dragend', dragEnd);
      
      const textSpan = document.createElement('span');
      textSpan.textContent = taskText;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = `🗑️`;
      deleteBtn.onclick = function() {
        taskDiv.remove();
      };
      
      taskDiv.appendChild(textSpan);
      taskDiv.appendChild(deleteBtn);
      
      return taskDiv;
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

    overlay.addEventListener('escape', () => {
      navLinks.classList.remove('nav-active');
      burger.classList.remove('toggle');
      overlay.style.display = 'none'; // Hide overlay
    });
  
    burger.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
  });