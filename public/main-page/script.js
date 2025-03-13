window.onload = function() {
    const images = document.querySelectorAll('.fall-img');
    images.forEach(image => {
        image.classList.add('falling');
    });
};