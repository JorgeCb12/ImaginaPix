const tecnologiaContainer = document.getElementById('tecnologia');
const minimalistaContainer = document.getElementById('minimalista');
const otrosContainer = document.getElementById('otros');
const todosContainer = document.getElementById('todos');

// Función para obtener el elemento de la foto
function getPhotoElement(photo_id, category) {
    const jpgPath = `img/${category}/photo_${photo_id}.jpg`;
    const pngPath = `img/${category}/photo_${photo_id}.png`;
    return `
      <a href="#" class="photo">
        <img src="${jpgPath}" alt="Photo ${photo_id}" onerror="this.onerror=null; this.src='${pngPath}'">
      </a>
    `;
}

// Función para agregar fotos a un contenedor
function addPhotosToContainer(container, totalPhotos, category) {
    let content = "";
    for (let i = 0; i < totalPhotos; i++) {
        content += getPhotoElement(i + 1, category);
    }
    container.innerHTML = content;
}

// Agregar fotos de la categoría "tecnologia"
addPhotosToContainer(tecnologiaContainer, 30, 'tecnologia');

// Agregar fotos de la categoría "minimalista"
addPhotosToContainer(minimalistaContainer, 20, 'minimalista');

// Agregar fotos de la categoría "otros"
addPhotosToContainer(otrosContainer, 20, 'otros');

// Función para mezclar un array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Mostrar todas las fotos al hacer clic "en Todos"
document.querySelector('#sidebar ul li a[href="#todos"]').addEventListener('click', function(event) {
    event.preventDefault();
    const allPhotos = [
        ...tecnologiaContainer.querySelectorAll('.photo'),
        ...minimalistaContainer.querySelectorAll('.photo'),
        ...otrosContainer.querySelectorAll('.photo')
    ].map(photo => photo.outerHTML);
    todosContainer.innerHTML = shuffle(allPhotos).join('');
    document.querySelectorAll('.photo-category').forEach(container => {
        container.style.display = 'none';
    });
    todosContainer.style.display = 'block';
    setActiveLink(this);
});

// Mostrar fotos por categoría al hacer clic en los enlaces del sidebar
document.querySelectorAll('#sidebar ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const category = this.getAttribute('href').substring(1);
        document.querySelectorAll('.photo-category').forEach(container => {
            container.style.display = 'none';
        });
        document.getElementById(category).style.display = 'block';
        setActiveLink(this);
    });
});

// Función para establecer el enlace activo
function setActiveLink(activeLink) {
    document.querySelectorAll('#sidebar ul li a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Activar la sección "Todos" por defecto al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#sidebar ul li a[href="#todos"]').click();
});
