// Navigation change bg color when scrol > 100vh

function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const navbar = document.querySelector('.navigation');

function topNavbar() {
  return window.scrollY > (window.innerHeight * 0.9)
    ? navbar.classList.add('scroll')
    : navbar.classList.remove('scroll');
}

window.addEventListener('scroll', debounce(topNavbar));

export { topNavbar };
