const form = document.getElementById('form');
const input = document.getElementById('input');
const myList = document.getElementById('todos');

const addTodoTask = () => {
	const todoText = input.value;

	if (todoText) {
		const todoEl = document.createElement('li');
		todoEl.innerText = todoText;

		todoEl.addEventListener('click', () => {
			todoEl.classList.toggle('completed');
		});

		todoEl.addEventListener('contextmenu', (e) => {
			e.preventDefault();

			todoEl.remove();
		});

		myList.appendChild(todoEl);
		input.value = '';
	}
};
form.addEventListener('submit', (e) => {
	e.preventDefault();

	addTodoTask();
});
