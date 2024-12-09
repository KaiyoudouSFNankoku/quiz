const marker01 = document.querySelector('#marker01');
const marker02 = document.querySelector('#marker02');
const marker03 = document.querySelector('#marker03');
const marker04 = document.querySelector('#marker04');
const ab1 = document.querySelector('#ab1');
const ab2 = document.querySelector('#ab2');
const ab3 = document.querySelector('#ab3');
const ab4 = document.querySelector('#ab4');

function setButtonState(button, isActive) {
  if (isActive) {
    button.classList.remove('inactive');
    button.classList.add('active');
    button.disabled = false;
  }
}

marker01.addEventListener('markerFound', () => {
  setButtonState(ab1, true);
});

marker02.addEventListener('markerFound', () => {
  setButtonState(ab2, true);
});

marker03.addEventListener('markerFound', () => {
  setButtonState(ab3, true);
});

marker04.addEventListener('markerFound', () => {
  setButtonState(ab4, true);
});
