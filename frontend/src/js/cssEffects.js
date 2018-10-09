// Glowing
function glowing() {
  const letters = [...document.querySelectorAll('.hero__item')];
  letters.forEach((letter, index) => {
    doSetTimeout(letter, index);
  });
}

function doSetTimeout(letter, index) {
  setTimeout(() => {
    letter.classList.toggle('glowing');
  }, index * 200);
}

export default glowing;
