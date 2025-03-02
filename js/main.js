const tecnologiaContainer = document.getElementById('tecnologia');
const minimalistaContainer = document.getElementById('minimalista');
const otrosContainer = document.getElementById('otros');
const todosContainer = document.getElementById('todos');

// Función para obtener el elemento de la foto
function getPhotoElement(photo_id, category) {
    const webpPath = `img/${category}/photo_${photo_id}.webp`;
    return `
      <a href="#" class="photo">
        <div class="loading">Cargando...</div>
        <img 
          data-src="${webpPath}" 
          alt="Photo ${photo_id}" 
          onerror="this.onerror=null; this.src='${webpPath}';" 
          loading="lazy" 
          onload="this.previousElementSibling.remove(); this.classList.add('lazy-loaded');">
      </a>
    `;
}

// Función para agregar fotos a un contenedor en columnas
function addPhotosToContainer(container, totalPhotos, category) {
    const columns = 3; // Número de columnas
    let columnContents = Array(columns).fill('');

    for (let i = 0; i < totalPhotos; i++) {
        const columnIndex = i % columns;
        columnContents[columnIndex] += getPhotoElement(i + 1, category);
    }

    container.innerHTML = columnContents.map(content => `<div class="column">${content}</div>`).join('');
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
    todosContainer.style.display = 'block'; // Cambiar a 'block' para asegurar que las imágenes se muestren correctamente
    setActiveLink(this);
    attachModalEvents(); // Adjuntar eventos del modal a las nuevas imágenes
    lazyLoadImages(); // Activar lazy loading para las nuevas imágenes
    window.dispatchEvent(new Event('resize')); // Forzar un evento de redimensionamiento para asegurar que las imágenes se carguen correctamente
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
        attachModalEvents(); // Adjuntar eventos del modal a las imágenes de la categoría seleccionada
        lazyLoadImages(); // Activar lazy loading para las nuevas imágenes
    });
});

// Función para establecer el enlace activo
function setActiveLink(activeLink) {
    document.querySelectorAll('#sidebar ul li a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Función para adjuntar eventos del modal a las imágenes
function attachModalEvents() {
    const modal = document.querySelector('.modal');
    const modalImg = modal.querySelector('.modal-img');
    const closeBtn = modal.querySelector('.close');
    const downloadBtn = modal.querySelector('.download-btn');

    document.querySelectorAll('.photo img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;

            // Obtener el ID de la foto y la categoría desde la ruta de la imagen
            const photoId = this.src.match(/photo_(\d+)/)[1];
            const category = this.src.match(/img\/(\w+)\//)[1];

            // Ruta de la imagen WebP
            const webpPath = `img/${category}/photo_${photoId}.webp`;

            // Actualizar el botón de descarga con la ruta correcta
            downloadBtn.href = webpPath;
            downloadBtn.setAttribute('download', `photo_${photoId}.webp`);
            downloadBtn.style.display = 'block'; // Asegurar que la opción de descarga esté visible
        });
    });

    // Cerrar el modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Función para activar lazy loading en las imágenes
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0.01
    };

    let observer;
    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(onIntersection, config);
        images.forEach(image => {
            observer.observe(image);
        });
    } else {
        images.forEach(image => {
            loadImage(image);
        });
    }

    function onIntersection(entries) {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                loadImage(entry.target);
            }
        });
    }

    function loadImage(image) {
        image.src = image.getAttribute('data-src');
        image.removeAttribute('data-src');
        image.classList.add('lazy-loaded');
    }
}

// Activar la sección "Todos" por defecto al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#sidebar ul li a[href="#todos"]').click();
    attachModalEvents(); // Adjuntar eventos del modal a las imágenes iniciales
    lazyLoadImages(); // Activar lazy loading para las imágenes iniciales
});
