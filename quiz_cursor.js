/*----- 視点カーソル -----*/
var cursorEnabled = false;
var quiz01Answered = false;
var quiz02Answered = false;
var quiz03Answered = false;

var marker01 = document.querySelector("#marker01");
var marker02 = document.querySelector("#marker02");
var marker03 = document.querySelector("#marker03");

// Quiz01
var correct01 = document.querySelector("#correct01");
var incorrect1_01 = document.querySelector("#incorrect1_01");
var incorrect2_01 = document.querySelector("#incorrect2_01");

changeColorOnHover(correct01);
changeColorOnHover(incorrect1_01);
changeColorOnHover(incorrect2_01);

// Quiz02
var correct02 = document.querySelector("#correct02");
var incorrect1_02 = document.querySelector("#incorrect1_02");
var incorrect2_02 = document.querySelector("#incorrect2_02");

changeColorOnHover(correct02);
changeColorOnHover(incorrect1_02);
changeColorOnHover(incorrect2_02);

// Quiz03
var correct03 = document.querySelector("#correct03");
var incorrect1_03 = document.querySelector("#incorrect1_03");
var incorrect2_03 = document.querySelector("#incorrect2_03");

changeColorOnHover(correct03);
changeColorOnHover(incorrect1_03);
changeColorOnHover(incorrect2_03);

/*----- クイズ番号の設定 -----*/
var quizNumber;

marker01.addEventListener("markerFound", function () {
	if (!quiz01Answered) {
		// マーカーが見つかった時の処理
		cursorEnabled = true;
		quizNumber = 1; // marker01の場合、quizNumberを1に設定
	}
});

marker02.addEventListener("markerFound", function () {
	if (!quiz02Answered) {
		// マーカーが見つかった時の処理
		cursorEnabled = true;
		quizNumber = 2; // marker02の場合、quizNumberを2に設定
	}
});

marker03.addEventListener("markerFound", function () {
	if (!quiz03Answered) {
		// マーカーが見つかった時の処理
		cursorEnabled = true;
		quizNumber = 3; // marker03の場合、quizNumberを3に設定
	}
});

// カーソルを無効にする
marker01.addEventListener("markerLost", function () {
	cursorEnabled = false;
});

marker02.addEventListener("markerLost", function () {
	cursorEnabled = false;
});

marker03.addEventListener("markerLost", function () {
	cursorEnabled = false;
});

/*----- カーソルを合わせると色が変わる -----*/
function changeColorOnHover(element) {
	let originalColor;
	element.addEventListener("mouseenter", function () {
		originalColor = element.getAttribute("material").color;
		if (cursorEnabled) {
			element.setAttribute("material", "color: #f0e68c");
			if (
				element === correct01 ||
				element === correct02 ||
				element === correct03
			) {
				correctOnHover(element);
			} else {
				incorrectOnHover(element);
			}
		}
	});

	element.addEventListener("mouseleave", function () {
		if (cursorEnabled) {
			element.setAttribute("material", "color: " + originalColor);
		}
	});
}

/*----- 正解・不正解の処理 -----*/
var score = 0;
var scoreElement = document.querySelector("#score");
var correctAudio = new Audio("./assets/correct.mp3");
var incorrectAudio = new Audio("./assets/incorrect.mp3");
var messageElement = document.querySelector("#message");
var stampHistory = []; // スタンプの履歴を保存する配列

/* 獲得したスタンプの表示に関する処理 */
function showFeedback(isCorrect) {
	var feedbackImage = document.getElementById("feedbackImage");
	var feedbackContainer = document.querySelector(".feedback-image");

	if (isCorrect) {
		if (quizNumber === 1) {
			feedbackImage.src = "./images/stamp/computer_dog.png"; // Quiz1の正解のスタンプ画像のパス
		} else if (quizNumber === 2) {
			feedbackImage.src = "./images/stamp/yosakoi_naruko.png"; // Quiz2の正解のスタンプ画像のパス
		} else if (quizNumber === 3) {
			feedbackImage.src = "./images/stamp/katsuo_tataki.png"; // Quiz3の正解のスタンプ画像のパス
		}
	} else {
		feedbackImage.src = "./images/stamp/cross.png"; // 不正解のバツ印画像のパス
	}

	feedbackContainer.style.display = "block";

	// スタンプの履歴に追加
	stampHistory.push(feedbackImage.src);
	updateStampHistory();

	setTimeout(function () {
		feedbackContainer.style.display = "none";
	}, 3000); // 3秒後にフィードバック画像を非表示にする
}

/* スタンプの履歴に関する処理 */
function updateStampHistory() {
	var stampHistoryContainer = document.querySelector(".stamp-history");
	stampHistoryContainer.innerHTML = ""; // スタンプ履歴をクリア

	// スタンプの履歴を表示
	stampHistory.forEach(function (stamp) {
		var stampImg = document.createElement("img");
		stampImg.src = stamp;
		stampHistoryContainer.appendChild(stampImg);
	});
}

/* 正解の場合 */
function correctOnHover(element) {
	var timer = null;
	timer = setTimeout(function () {
		score += 10; // スコアを10増加
		updateScoreDisplay(); // スコアの表示を更新
		correctAudio.play(); // 正解音を再生
		showMessage("正解！！ 10ptゲット！", true);
		showFeedback(true); // 正解のフィードバック画像を表示
		cursorEnabled = false; // カーソルの反応を無効化
		setAnswered();
	}, 3000); // 3秒後に処理を実行

	element.addEventListener("mouseleave", function () {
		if (timer !== null) {
			clearTimeout(timer); // タイマーをクリア
		}
	});
}

/* 不正解の場合 */
function incorrectOnHover(element) {
	var timer = null;
	timer = setTimeout(function () {
		incorrectAudio.play();
		showMessage("ざんねん！！", false);
		showFeedback(false); // 不正解のフィードバック画像を表示
		cursorEnabled = false; // カーソルの反応を無効化
		setAnswered();
	}, 3000); // 3秒後に処理を実行

	element.addEventListener("mouseleave", function () {
		if (timer !== null) {
			clearTimeout(timer); // タイマーをクリア
		}
	});
}

/* 解答済に設定 */
function setAnswered() {
	if (quizNumber === 1) {
		quiz01Answered = true;
	} else if (quizNumber === 2) {
		quiz02Answered = true;
	} else if (quizNumber === 3) {
		quiz03Answered = true;
	}
}

/* スコア表示を更新する処理　*/
function updateScoreDisplay() {
	var scoreValueElement = document.querySelector("#scoreValue");
	scoreValueElement.textContent = score;
}

/* メッセージの表示に関する処理 */
// 正解・不正解のメッセージ表示
function showMessage(text, isCorrect) {
	messageElement.textContent = text;
	if (isCorrect) {
		messageElement.style.backgroundColor = "rgba(0, 255, 0, 0.8)"; // 正解メッセージの背景色
	} else {
		messageElement.style.backgroundColor = "rgba(255, 0, 0, 0.8)"; // 不正解メッセージの背景色
	}
	messageElement.style.display = "block";

	setTimeout(function () {
		messageElement.style.display = "none";
	}, 3000); // 3秒後にメッセージを非表示にする
}
