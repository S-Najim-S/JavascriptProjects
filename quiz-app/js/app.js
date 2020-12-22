const questionEl = document.querySelector(".question-text");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const answerEls = document.querySelectorAll(".answer");
const myBtn = document.getElementById("submit-btn");
const quiz = document.getElementById("quiz");

let currentQuestion = 0;
let score = 0;

const myQuiz = [
	{
		question: "What year was the club formed?",
		a: "1899",
		b: "1900",
		c: "1908",
		d: "1921",
		correct: "a",
	},
	{
		question: "What football ground does the club use?",
		a: "Camp nou",
		b: "Old Traford",
		c: "Stamford Bridge",
		d: "Bernabeu",
		correct: "a",
	},
	{
		question: "What is the club's stadium capacity",
		a: "45355",
		b: "65354",
		c: "99354",
		d: "142325",
		correct: "c",
	},
	{
		question: "Who was the head coach of the club in the 2018/19 season?",
		a: "Guardiola",
		b: "Valverde",
		c: "Luis E.",
		d: "Koeman",
		correct: "b",
	},
	{
		question: "Who scored the most number of goals in the history of club?",
		a: "Ronaldo razario",
		b: "Maradona",
		c: "Messi",
		d: "Rivaldo",
		correct: "c",
	},
];

const getSelected = () => {
	let answer = undefined;

	answerEls.forEach((answerEl) => {
		if (answerEl.checked) {
			answer = answerEl.id;
		}
	});
	return answer;
};

const loadQuiz = () => {
	deselectQuestion();
	const currentQuizData = myQuiz[currentQuestion];
	questionEl.innerHTML = currentQuizData.question;
	a_text.innerText = currentQuizData.a;
	b_text.innerText = currentQuizData.b;
	c_text.innerText = currentQuizData.c;
	d_text.innerText = currentQuizData.d;
};

const deselectQuestion = () => {
	answerEls.forEach((answerEl) => {
		if (answerEl.checked) {
			answerEl.checked = false;
		}
	});
};

myBtn.addEventListener("click", () => {
	// check for answer
	const answer = getSelected();

	if (answer) {
		if (answer === myQuiz[currentQuestion].correct) {
			console.log("Inside score++" + score);
			score++;
		}
		currentQuestion++;
		if (currentQuestion < myQuiz.length) {
			loadQuiz();
		} else {
			quiz.innerHTML = `<h2>You have answered ${score}/${myQuiz.length}.</h2>
            <button onclick="location.reload()">Reload</button>
            `;
		}
	}
});

loadQuiz();
