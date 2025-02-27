document.addEventListener('DOMContentLoaded', function() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var captionText = document.getElementById('caption');
    var closeBtn = document.querySelector('.close');
  
    // Select images from both .gallery and .item-gallery containers
    var galleryImages = document.querySelectorAll('.gallery .item img, .item-gallery .item img');
    galleryImages.forEach(function(img) {
      img.addEventListener('click', function() {
        lightbox.style.display = "block";
        lightboxImg.src = this.dataset.full;
        // If a detailed description is provided in a data attribute, use it; otherwise, fall back to the alt text.
        captionText.textContent = this.dataset.description || this.alt;
      });
    });
  
    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', function() {
      lightbox.style.display = "none";
    });
  
    // Also close the modal when clicking outside the image
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  });
  