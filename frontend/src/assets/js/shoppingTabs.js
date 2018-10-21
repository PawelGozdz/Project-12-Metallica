const shoppingBody = document.querySelectorAll('.shopping__body');

function shoppingTabs(e) {
  e.preventDefault();
  // Hiding all each click
  shoppingBody.forEach(body => body.classList.remove('active'));

  console.log(e.target.dataset.nav);

  shoppingBody.forEach((body) => {
    if (e.target.dataset.nav === body.getAttribute('id')) {
      body.classList.toggle('active');
    }
  });
}

export { shoppingTabs };
