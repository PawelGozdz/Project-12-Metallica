function asideMenu(e) {
  const aside = document.querySelector('.aside');
  aside.classList.toggle('open');
  // document.addEventListener('click', (ev) => {
  //   if (ev.target.closest('.aside') === null) {
  //     console.log('Nie aside menu', ev.target.closest('.aside'));
  //     aside.classList.toggle('open');
  //   }
  //   // console.log(ev.target);
  //   // console.log(ev.target.closest('.aside'));
  // });
}

// Aside slider
let slideIndex = 0;
function asideSlider() {
  const slides = document.querySelectorAll('.aside__box');
  Array.from(slides).forEach(el => el.classList.add('hide'));
  if (slideIndex >= slides.length - 1) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slides[index].classList.toggle('hide');
      slides[slideIndex + 1].classList.toggle('hide');
    }
  });
  slideIndex++;
}
setInterval(() => {
  asideSlider();
}, 3000);

export { asideMenu, asideSlider };
