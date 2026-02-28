(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {


    var images = [
      'https://server.domainaku.com/uploads/planet88/mobile/popup.webp',
      'https://server.domainaku.com/uploads/planet88/mobile/popup.webp'
    ];

    var links = [
      '/game/pgr/3',
      '/game/pgr/3'
    ];

    var currentImage = 0;
    var popupVisible = false;

    var popup = document.getElementById('popup-container');
    var imageElement = document.getElementById('popup-image');
    var linkElement = document.getElementById('popup-link');
    var closeButton = document.getElementById('popup-close');
    var prevBtn = document.getElementById('popup-prev');
    var nextBtn = document.getElementById('popup-next');

    if (popup && imageElement && linkElement) {

      var preloadedImages = images.map(function (src) {
        var img = new Image();
        img.src = src;
        return img;
      });

      function showImage(index) {
        currentImage = index;
        imageElement.src = preloadedImages[currentImage].src;
        linkElement.href = links[currentImage];
      }

      function nextImage() {
        currentImage = (currentImage + 1) % images.length;
        showImage(currentImage);
      }

      function prevImage() {
        currentImage = (currentImage - 1 + images.length) % images.length;
        showImage(currentImage);
      }

      function showPopup() {
        if (popupVisible) return;
        popupVisible = true;
        popup.style.display = 'flex';
        showImage(currentImage);
      }

      function closePopup() {
        popupVisible = false;
        popup.style.display = 'none';
        localStorage.setItem('popupDismissed', Date.now());
      }

      if (closeButton) {
        closeButton.addEventListener('click', function (e) {
          e.stopPropagation();
          closePopup();
        });
      }

      popup.addEventListener('click', closePopup);

      if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          prevImage();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          nextImage();
        });
      }

      linkElement.addEventListener('click', closePopup);

      /* Swipe Support */
      var touchStartX = 0;
      var touchEndX = 0;

      imageElement.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
      });

      imageElement.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;

        if (touchEndX < touchStartX - 30) nextImage();
        if (touchEndX > touchStartX + 30) prevImage();
      });

      /* Show popup setiap 10 menit */
      var lastDismissed = parseInt(localStorage.getItem('popupDismissed')) || 0;
      var now = Date.now();

      if (now - lastDismissed > 600000) {
        showPopup();
      }
    }



    var btnAccount = document.querySelector('.btn-account');
    if (btnAccount && btnAccount.classList.contains('black2')) {
      btnAccount.classList.remove('black2');
    }


    if (window.jQuery) {
      window.jQuery('.custom-page').hide();
    } else {
      var customPage = document.querySelector('.custom-page');
      if (customPage) customPage.style.display = 'none';
    }

  });

})();