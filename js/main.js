const photoContainer = document.getElementById('photo-container');

// Función para obtener el elemento de la foto
function getPhotoElement(photo_id) {
    return `
      <a href="#" class="photo">
        <img src="img/photo_${photo_id}.jpg" alt="Photo ${photo_id}">
      </a>
    `;
}

// Función para agregar fotos al contenedor
function addPhotosToContainer(photo_ids) {
    photo_ids.forEach(photo_id => {
        const photoElement = getPhotoElement(photo_id);
        photoContainer.innerHTML += photoElement;
    });
}

// Ejemplo de uso
const photoIds = [1, 2, 3, 4, 5, 6, 7, 8];
addPhotosToContainer(photoIds);