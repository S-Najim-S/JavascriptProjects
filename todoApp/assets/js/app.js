const form = document.getElementById('form');
const input = document.getElementById('input');
const myList = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

const updateStorage = () => {
	const todosEls = document.querySelectorAll('li');

	const todos = [];

	todosEls.forEach((todoEl) => {
		todos.push({
			text: todoEl.innerText,
			completed: todoEl.classList.contains('completed'),
		});
	});

	localStorage.setItem('todos', JSON.stringify(todos));
};
const addTodoTask = (todo) => {
	let todoText = input.value;

	if (todo) {
		todoText = todo.text;
	}

	if (todoText) {
		const todoEl = document.createElement('li');
		if (todo && todo.completed) {
			todoEl.classList.add('completed');
		}
		todoEl.innerText = todoText;

		todoEl.addEventListener('click', () => {
			todoEl.classList.toggle('completed');
			updateStorage();
		});

		todoEl.addEventListener('contextmenu', (e) => {
			e.preventDefault();

			todoEl.remove();
			updateStorage();
		});

		myList.appendChild(todoEl);
		input.value = '';

		updateStorage();
	}
};
form.addEventListener('submit', (e) => {
	e.preventDefault();

	addTodoTask();
});
if (todos) {
	todos.forEach((todo) => {
		addTodoTask(todo);
	});
}
