const addBtn = document.getElementById("add");
const notesEl = document.querySelector(".notes");

const addNewNote = () => {
	const note = document.createElement("div");
	note.classList.add("note");

	note.innerHTML = `
    <div class="notes">
        <div class="toolbar">
            <button class="edit"><i class="fa fa-pencil"></i></button>
            <button class="delete"><i class="fa fa-trash" ></i></button>
        </div>
        <div class="main_text hidden"></div>
        <textarea></textarea>
    </div> `;

	const textArea = note.querySelector("textarea");
	const main_text = note.querySelector(".main_text");
	const deleteBtn = note.querySelector(".delete");
	const editBtn = note.querySelector(".edit");

	// toggling the hidden class for main-text and textarea
	editBtn.addEventListener("click", () => {
		main_text.classList.toggle("hidden");
		textArea.classList.toggle("hidden");
	});

	// remove note
	deleteBtn.addEventListener("click", () => {
		note.remove();
	});
	// Typing inside textarea
	textArea.addEventListener("input", (e) => {
		const { value } = e.target;
		main_text.innerHTML = marked(value);
	});

	// add new Note
	document.body.appendChild(note);
};
addBtn.addEventListener("click", addNewNote);
