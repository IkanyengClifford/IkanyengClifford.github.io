//to ensure that code wont run until content is fully loaded without waiting for my images and stylesheets
document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load tasks when the document is ready
    checkDarkMode(); // Check and apply dark mode
});

// Function to add tasks
function addTasks() {
    const tasksName = document.getElementById('tasksName').value.trim();
    const dueDate = document.getElementById('dueDate').value;
    
    if (tasksName !== '' && dueDate !== '') {
        // Create a new tasks element and enable it to be deleted
        const tasksContainer = document.getElementById('tasks-container');
        const tasksElement = document.createElement('div');
        tasksElement.classList.add('tasks');
        tasksElement.innerHTML = `
            <strong>${tasksName}</strong><p>
            Due: ${dueDate}<p>
            <button onclick="deleteTask(this)">Delete</button>`;
        tasksContainer.appendChild(tasksElement);

        // Save my tasks to local storage
        saveTasks();
    } else {
        alert('Please specify a due date for your task');
    }
}

// Function to delete tasks
function deleteTask(button) {
    // Get the parent task element and remove it
    const taskElement = button.parentNode;
    taskElement.remove();

    // Save tasks to local storage after deletion
    saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = document.querySelectorAll('.tasks');
    const tasksData = [];

    // Extract task name and due date from each task and store in an array
    tasks.forEach(task => {
        const taskName = task.querySelector('strong').textContent;
        const dueDate = task.querySelector('p').textContent
        .split('Due: ')[1];
        tasksData.push({ taskName, dueDate });
    });

    // Save the array to local storage as a JSON string
    localStorage.setItem('tasks', JSON.stringify(tasksData));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasksContainer = document.getElementById('tasks-container');
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasksData = JSON.parse(savedTasks);

        // Create tasks element for each saved task with a delete button
        tasksData.forEach(taskData => {
            const tasksElement = document.createElement('div');
            tasksElement.classList.add('tasks');
            tasksElement.innerHTML = `
                <strong>${taskData.taskName}</strong><br>
                Due: ${taskData.dueDate}
                <button onclick="deleteTask(this)">Delete</button>`;
            tasksContainer.appendChild(tasksElement);
        });
    }
}

// Function to check and toggle dark mode
function checkDarkMode() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const appContainer = document.getElementById('app-container');

    toggleSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', toggleSwitch.checked);
        saveDarkModeState();
    });

    const darkModeState = localStorage.getItem('darkMode');
    if (darkModeState && darkModeState === 'true') {
        toggleSwitch.checked = true;
        document.body.classList.add('dark-mode');
    }
}

// Function to save dark mode state to local storage
function saveDarkModeState() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    localStorage.setItem('darkMode', toggleSwitch.checked);
}
