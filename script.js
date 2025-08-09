// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // If input is empty, alert the user
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Set onclick event to remove this task
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Append remove button to list item
        li.appendChild(removeBtn);

        // Append list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Attach click event listener to Add Task button
    addButton.addEventListener('click', addTask);

    // Attach keypress event listener to input to add task on Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

});

