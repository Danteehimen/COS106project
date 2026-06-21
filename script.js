document.addEventListener("DOMContentLoaded", () => {
    // --- Academic Planner Logic ---
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    
    // Pre-loaded personal tasks
    let tasks = [
        { id: 1, text: "Review COS 106 JavaScript Modules", completed: false },
        { id: 2, text: "Draft updated factory SOPs", completed: false },
        { id: 3, text: "Edit final chapter of 'Silent Stalker'", completed: true }
    ];

    if (taskForm) {
        taskForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText);
                taskInput.value = "";
            }
        });
        renderTasks(); 
    }

    function addTask(text) {
        const task = { id: Date.now(), text: text, completed: false };
        tasks.push(task);
        renderTasks();
    }

    window.toggleTask = function(id) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        renderTasks();
    }

    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";
            li.innerHTML = `
                <span onclick="toggleTask(${task.id})" style="cursor:pointer;">
                    ${task.text}
                </span>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // --- Contact Form Validation Logic ---
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault(); 

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !phone || !message) {
                alert("All fields are required.");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            const phonePattern = /^\d+$/;
            if (!phonePattern.test(phone)) {
                alert("Phone number must contain only digits.");
                return;
            }

            alert("Form submitted successfully!");
            contactForm.reset();
        });
    }
});