document.addEventListener("DOMContentLoaded", () => {
	const taskInput = document.querySelector("#taskInput");
	const addTaskBtn = document.querySelector("#addTaskBtn");
	const taskList = document.querySelector("#taskList");
	let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
	tasksArray.forEach((task) => {
		renderTask(task);
	});
	addTaskBtn.addEventListener("click", () => {
		if (taskInput.value === "") {
			return;
		}
		const task = {
			id: Date.now(),
			content: taskInput.value,
			isCompleted: false,
		};
		taskInput.value = "";
		tasksArray.push(task);
		renderTask(task);
		saveTasks(tasksArray);
	});

	function renderTask(task) {
		const li = document.createElement("li");
		console.log(task.content);
		const span = document.createElement("span");
		span.textContent = task.content;
		const button = document.createElement("button");
		button.textContent = "delete";
		li.appendChild(span);
		li.appendChild(button);
		li.classList.add(
			"flex",
			"flex-row",
			"justify-between",
			"items-center",
			"border-2",
			"border-black-500",
			"p-1"
		);
		button.classList.add("bg-red-500", "p-2", "rounded-md");
		taskList.appendChild(li);
		li.addEventListener("click", (e) => {
			if (e.target.tagName == "BUTTON") return;
			task.isCompleted = !task.isCompleted;
			span.classList.toggle("line-through");
		});
		li.querySelector("button").addEventListener("click", (e) => {
			e.stopPropagation();
			tasksArray = tasksArray.filter((t) => t.id != task.id);
			li.remove();
			saveTasks(tasksArray);
		});
	}
	function saveTasks(tasks) {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}
});
