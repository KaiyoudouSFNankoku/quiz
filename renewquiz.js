const marker01 = document.querySelector('#marker01');
const marker02 = document.querySelector('#marker02');
const marker03 = document.querySelector('#marker03');
const marker04 = document.querySelector('#marker04');
const ab1 = document.querySelector('#ab1');
const ab2 = document.querySelector('#ab2');
const ab3 = document.querySelector('#ab3');
const ab4 = document.querySelector('#ab4');

// localStorage.setItem("bit",0);
// localStorage.setItem("score",0);
// localStorage.setItem("bit",0);

function setButtonState(button, isActive) {
  if (isActive) {
    button.classList.remove('inactive');
    button.classList.add('active');
    button.disabled = false;
  }
}

let test1 = localStorage.getItem("bit") || 0;
		let bit = Number(test1);

marker01.addEventListener('markerFound', () => {
  if(checkanswered(1,bit)){}
  else{
  setButtonState(ab1, true);
  }
});

marker02.addEventListener('markerFound', () => {
  if(checkanswered(2,bit)){}
  else{
  setButtonState(ab2, true);
  }
});

marker03.addEventListener('markerFound', () => {
  if(checkanswered(3,bit)){}
  else{
  setButtonState(ab3, true);
  }
});

marker04.addEventListener('markerFound', () => {
  if(checkanswered(4,bit)){}
  else{
  setButtonState(ab4, true);
  }
});

//答えてるか関数
function checkanswered(qn,bit){
	if(bit&(1<<qn-1)){
		return 1;
	}else{
		return 0;
	}

	}