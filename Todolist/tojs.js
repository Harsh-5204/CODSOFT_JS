document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('taskform');
const taskInput = document.getElementById('taskinput');
const taskList = document.getElementById('tasklist');

taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', modifyTask);

function addTask(e) {
    e.preventDefault();
    
    const taskText = taskInput.value;
    if (taskText === '') return;
    
    const li = document.createElement('li');
    li.textContent = taskText;
    
    const editBtn = document.createElement('span');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    li.appendChild(editBtn);
    
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    li.appendChild(deleteBtn);
    
    taskList.appendChild(li);
    
    storeTaskInLocalStorage(taskText);
    taskInput.value = '';
}

function modifyTask(e) {
    if (e.target.classList.contains('edit')) {
        const li = e.target.parentElement;
        const newTask = prompt('Edit task:', li.firstChild.textContent);
        if (newTask !== null) {
            li.firstChild.textContent = newTask;
            updateTaskInLocalStorage(li.firstChild.textContent, newTask);
        }
    } else if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete the task?')) {
            const li = e.target.parentElement;
            removeTaskFromLocalStorage(li.firstChild.textContent);
            taskList.removeChild(li);
        }
    }
}

function storeTaskInLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        
        const editBtn = document.createElement('span');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        li.appendChild(editBtn);
        
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    });
}

function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(oldTask, newTask) {
    let tasks = getTasksFromLocalStorage();
    const index = tasks.indexOf(oldTask);
    if (index !== -1) {
        tasks[index] = newTask;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}