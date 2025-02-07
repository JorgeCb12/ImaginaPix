document.addEventListener('DOMContentLoaded', function() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <span class="close">&times;</span>
        <div class="modal-content">
            <img src="" alt="Ampliada">
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.modal-content img');
    const closeBtn = modal.querySelector('.close');

    document.querySelectorAll('.photo img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
