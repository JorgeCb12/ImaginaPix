document.addEventListener('DOMContentLoaded', function() {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      setActiveLink();
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
