// Glowing
function glowing() {
  const letters = [...document.querySelectorAll('.hero__item')];
  letters.forEach((letter, index) => {
    toggleLetterInSequence(letter, index);
  });
}

function expandListItems(e) {
  e.preventDefault();

  // Taking a unique number for each album clicked by user
  const imgValue = e.target.closest('figure');

  // Grab all elements
  const allLists = [...document.querySelectorAll('.albums__list')];

  const currentList = document.querySelector(`.albums__list[value="${imgValue.getAttribute('value')}"]`);
  const currentItems = [...currentList.querySelectorAll('.albums__item')];

  // loop and hide all lists items each click
  allLists.forEach((list) => {
    if (list === currentList) {
      list.classList.toggle('open');
      currentItems.forEach((item, index) => toggleUlItems(item, index));
    } else {
      list.classList.remove('open');
      currentItems.map(item => item.classList.remove('show'));
    }
  });
}

function toggleUlItems(item, index) {
  setTimeout(() => {
    item.classList.add('show');
  }, index * 100);
}

function toggleLetterInSequence(item, index) {
  setTimeout(() => {
    item.classList.toggle('glowing');
  }, index * 200);
}

function dropdowns(e) {
  e.preventDefault();
  e.target.classList.toggle('open');
}

export { glowing, expandListItems, dropdowns };
