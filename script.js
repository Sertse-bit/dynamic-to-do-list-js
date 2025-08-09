document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    // Add a new task to DOM and optionally save to Local Storage
    function addTask(taskText = null, save = true) {
        // If called without argument, read from input field
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task from DOM and Local Storage on button click
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            // Update Local Storage after removal
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const filteredTasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(filteredTasks));
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            // Save new task in Local Storage
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        taskInput.value = '';
    }

    // Event listeners for button and Enter key
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load existing tasks on page load
    loadTasks();
});
