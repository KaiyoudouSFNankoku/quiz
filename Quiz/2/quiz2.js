const quizData = [
	{
		question: "関白（かんぱく）の地位に就いた戦国武将は誰でしょう？",
		choices: [
			{ text: "織田信長" },
			{ text: "豊臣秀吉" },
			{ text: "徳川家康" },
			{ text: "上杉謙信" },
		],
		correct: 1,
	},
	/*
    {
      question: "江戸幕府の初代将軍は誰ですか？",
      choices: [
        { text: "織田信長" },
        { text: "豊臣秀吉" },
        { text: "徳川家康" },
        { text: "武田信玄" },
      ],
      correct: 2,
    },
    */
	// 他の問題もここに追加
];

let currentQuiz = quizData; // 全問題をそのまま使用
let currentQuestion = 0;
let test = localStorage.getItem("score") || 0;
let score = Number(test);
const totalQuestions = quizData.length;
document.getElementById("total-questions").textContent = totalQuestions;

// 初期化
function initQuiz() {
	currentQuestion = 0; // 問題番号の初期化
	//score = 0; // スコアの初期化
	loadQuestion();
}

// 問題と選択肢を表示
function loadQuestion() {
	document.getElementById("quiz-container").style.display = "block";
	document.getElementById("answer-section").style.display = "none";
	document.getElementById("final-result").style.display = "none";

	// 問題番号を表示
	/*document.getElementById("question-number").textContent = `第 ${
      currentQuestion + 1
    } 問`;*/

	const questionData = currentQuiz[currentQuestion];

	document.getElementById("question").textContent = questionData.question;
	const choicesContainer = document.getElementById("choices-container");
	choicesContainer.innerHTML = "";

	// 選択肢に番号を付ける
	questionData.choices.forEach((choice, index) => {
		const choiceDiv = document.createElement("div");
		choiceDiv.classList.add("choice");
		choiceDiv.textContent = `${index + 1}. ${choice.text}`; // 番号付きの選択肢
		choiceDiv.onclick = () => checkAnswer(index, questionData);
		choicesContainer.appendChild(choiceDiv);
	});
}

// 答えを確認
function checkAnswer(selected, questionData) {
	document.getElementById("quiz-container").style.display = "none";
	document.getElementById("answer-section").style.display = "block";

	const resultText = document.getElementById("answer-result");
	const choicesContainer = document.getElementById("choices-container");
	choicesContainer.innerHTML = ""; // クリアして選択肢を再描画

	// 正解・不正解のメッセージ表示
	if (selected === questionData.correct) {
		resultText.innerHTML = "<span class='correct'>正解！</span>";
		score++;
		localStorage.setItem("score", score);
		let test1 = localStorage.getItem("bit") || 0;
		let bit = Number(test1);
		bit = bit+2;
		localStorage.setItem("bit", bit);
	} else {
		resultText.innerHTML = "<span class='wrong'>不正解です。</span>";
		localStorage.setItem("score", score);
		let test1 = localStorage.getItem("bit") || 0;
		let bit = Number(test1);
		bit = bit+2;
		localStorage.setItem("bit", bit);
	}

	// 最終問題かどうかのチェック
	if (currentQuestion === currentQuiz.length - 1) {
		document.getElementById("next-question").textContent = "結果を見る";
	} else {
		document.getElementById("next-question").textContent = "次の問題へ";
	}
}

// 次の問題へ
function nextQuestion() {
	currentQuestion++;
	if (currentQuestion < currentQuiz.length) {
		loadQuestion();
		document.getElementById("container").scrollIntoView({ behavior: "smooth" }); // containerにスクロール
	} else {
		showResult();
	}
}

// 結果を表示
function showResult() {
	document.getElementById("answer-section").style.display = "none";
	document.getElementById("final-result").style.display = "block";

	const percentage = (score / currentQuiz.length) * 100;
	document.getElementById("score").textContent = `正解数: ${score}/${
		currentQuiz.length
	} (${percentage.toFixed(2)}%)`;
}

// もう一度遊ぶ
/*function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    initQuiz();
  }*/

// クイズ開始
initQuiz();
