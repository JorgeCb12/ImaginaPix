const photoContainer = document.getElementById('photo-container');

// Función para obtener el elemento de la foto
function getPhotoElement(photo_id) {
    const jpgPath = `img/photo_${photo_id}.jpg`;
    const pngPath = `img/photo_${photo_id}.png`;
    return `
      <a href="#" class="photo">
        <img src="${jpgPath}" alt="Photo ${photo_id}" onerror="this.onerror=null; this.src='${pngPath}'">
      </a>
    `;
}

let content = "";
const totalPhotos = 30; 
for (let i = 0; i < totalPhotos; i++) {
    content += getPhotoElement(i + 1);
}
photoContainer.innerHTML = content;
