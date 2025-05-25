document.addEventListener('DOMContentLoaded', function() {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var captionText = document.getElementById('caption');
  var closeBtn = document.querySelector('.close');
  let panzoomInstance = null;
  console.log("Panzoom available?", typeof window.Panzoom);




  // Select images from both .gallery and .item-gallery containers
  var galleryImages = document.querySelectorAll('.gallery .item img, .item-gallery .item img');
  galleryImages.forEach(function(img) {
    img.addEventListener('click', function() {
      lightbox.style.display = "block";
      lightboxImg.src = this.dataset.full;
      captionText.textContent = this.dataset.description || this.alt;

      // Destroy previous instance if one exists
      if (panzoomInstance) {
        panzoomInstance.destroy();
      }

      // Initialize Panzoom on the image
      panzoomInstance = window.Panzoom(lightboxImg, {
        maxScale: 5,
        minScale: 1,
        contain: 'outside',
      });

      // Enable scroll wheel zoom
      lightboxImg.parentElement.addEventListener('wheel', panzoomInstance.zoomWithWheel);
    });
  });

  // Close the modal when the close button is clicked
  closeBtn.addEventListener('click', function() {
    lightbox.style.display = "none";
    if (panzoomInstance) {
      panzoomInstance.reset();
    }
  });

  // Also close the modal when clicking outside the image
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      if (panzoomInstance) {
        panzoomInstance.reset();
      }
    }
  });

  // Zoom control buttons
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');
  const resetBtn = document.getElementById('reset');

  if (zoomInBtn && zoomOutBtn && resetBtn) {
    zoomInBtn.addEventListener('click', function () {
      if (panzoomInstance) panzoomInstance.zoomIn();
    });

    zoomOutBtn.addEventListener('click', function () {
      if (panzoomInstance) panzoomInstance.zoomOut();
    });

    resetBtn.addEventListener('click', function () {
      if (panzoomInstance) panzoomInstance.reset();
    });
  }
});
