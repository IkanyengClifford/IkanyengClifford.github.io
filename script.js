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

        // Create and append child elements
        const nameElement = document.createElement('strong');
        nameElement.textContent = tasksName;
        const dueDateElement = document.createElement('p');
        dueDateElement.textContent = `Due: ${dueDate}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(deleteButton));

        tasksElement.appendChild(nameElement);
        tasksElement.appendChild(dueDateElement);
        tasksElement.appendChild(deleteButton);

        tasksContainer.appendChild(tasksElement);

        // Save my tasks to local storage
        saveTasks();
    } else {
        alert('Please specify a due date for your task');
    }
}

function deleteTask(button) {
    // Get the parent task element and remove it
    const taskElement = button.parentNode;
    taskElement.remove();

    // Get the task name from the deleted task element
    const taskName = taskElement.querySelector('strong').textContent;

    // Remove the task from local storage
    removeTaskFromLocalStorage(taskName);
}

function removeTaskFromLocalStorage(taskName) {
    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Find and remove the task with the specified name
    tasks = tasks.filter(task => task.name !== taskName);

    // Save the updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Function to save tasks to local storage
function saveTasks() {
    const tasks = document.querySelectorAll('tasks');
    const tasksData = Array.from(tasks).map(task=>{

        const taskName = task.querySelector('strong').textContent;
        const dueDate = task.querySelector('p').textContent.split('Due: ')[1];
        return(taskName,dueDate);

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

            //My task 
            const taskNameElement = document.createElement('strong');
            taskNameElement.textContent = taskData.taskName;

            //The Due date
            const dueDateElement = document.createElement('span');
            dueDateElement.textContent = `Due: ${taskData.dueDate}`;

            //My delete function button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                deleteTask(this);
            });

            // Append child elements to the tasksElement
            tasksElement.appendChild(taskNameElement);
            tasksElement.appendChild(document.createElement('br'));
            tasksElement.appendChild(dueDateElement);
            tasksElement.appendChild(deleteButton);

            // Append tasksElement to the tasksContainer
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
