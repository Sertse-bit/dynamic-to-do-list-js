function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
}

function addTask(taskText = null, save = true) {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (taskText === null) {
        taskText = taskInput.value.trim();
    }
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = () => {
        taskList.removeChild(li);
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const filteredTasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskInput.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');

    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });

    loadTasks();
});
