document.addEventListener('DOMContentLoaded', function() {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      setActiveLink();
      setupHamburgerMenu();
    })
    .catch(error => console.error('Error al cargar el header:', error));
});

function setActiveLink() {
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('#header nav ul li a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

function setupHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('#header nav ul');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    toggleHamburgerIcon(hamburger);
  });

  document.addEventListener('click', function(event) {
    const isClickInside = hamburger.contains(event.target) || navMenu.contains(event.target);
    if (!isClickInside) {
      navMenu.classList.remove('show');
      resetHamburgerIcon(hamburger);
    }
  });
}

function toggleHamburgerIcon(hamburger) {
  const lines = hamburger.querySelectorAll('div');
  lines[0].classList.toggle('rotate1');
  lines[1].classList.toggle('hide');
  lines[2].classList.toggle('rotate2');
}

function resetHamburgerIcon(hamburger) {
  const lines = hamburger.querySelectorAll('div');
  lines[0].classList.remove('rotate1');
  lines[1].classList.remove('hide');
  lines[2].classList.remove('rotate2');
}

