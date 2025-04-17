document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initVideoGallery();
    initVideoSwiper();  // New function for video swiper
    initImageSlider();
    initLogoSlider();
    initImagePopup();
  });
  
  // Original Video Gallery with fullscreen functionality
  function initVideoGallery() {
    const video = document.querySelector('.our-gallaries-video');
    const fullscreenBtn = document.querySelector('.video-fullscreen-btn');
    
    if (video && fullscreenBtn) {
      // Add controls to the video
      video.controls = true;
      
      // Add click event for fullscreen button
      fullscreenBtn.addEventListener('click', function() {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { /* Safari */
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE11 */
          video.msRequestFullscreen();
        }
        
        // Auto play when entering fullscreen
        video.play();
      });
      
      // Add click event to the video itself for play/pause
      video.addEventListener('click', function(e) {
        // Prevent clicking on video when clicking controls
        if (e.target === video) {
          if (!video.paused) {
            video.pause();
          } else {
            video.play();
          }
        }
      });
      
      // Event listener for fullscreen change
      document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement && !video.paused) {
          // When exiting fullscreen but video is still playing
          video.pause();
        }
      });
    }
  }
  
  // New function for Video Swiper
  function initVideoSwiper() {
    // Initialize Swiper for video slider
    const videoSwiper = new Swiper('.video-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.video-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.video-swiper .swiper-button-next',
        prevEl: '.video-swiper .swiper-button-prev',
      },
      on: {
        slideChange: function() {
          // Pause all videos when slide changes
          document.querySelectorAll('.swiper-video').forEach(function(video) {
            video.pause();
          });
        }
      }
    });
    
    // Handle video play/pause on slide click
    const videoSlides = document.querySelectorAll('.video-swiper .swiper-slide');
    videoSlides.forEach(slide => {
      const video = slide.querySelector('video');
      if (video) {
        // When clicking on the video slide (but not on controls)
        slide.addEventListener('click', function(e) {
          if (e.target === slide || e.target === video) {
            if (video.paused) {
              // Pause all other videos first
              document.querySelectorAll('.swiper-video').forEach(function(v) {
                if (v !== video) v.pause();
              });
              video.play();
            } else {
              video.pause();
            }
          }
        });
        
        // Pause video when it's not in the active slide
        video.addEventListener('play', function() {
          const slideIndex = [...videoSlides].indexOf(slide);
          if (videoSwiper.activeIndex !== slideIndex) {
            video.pause();
          }
        });
      }
    });
  }
  
  // Image Slider with popup details
  function initImageSlider() {
    // Initialize Swiper for image slider
    const imageSwiper = new Swiper('.image-slider', {
      slidesPerView: 3,  // Show 3 slides at a time
      spaceBetween: 30,
      loop: true,
      autoplay: {  // Add autoplay
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.image-slider .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.image-slider .swiper-button-next',
        prevEl: '.image-slider .swiper-button-prev',
      },
      
    });
    
    // Add click events to slides
    const slides = document.querySelectorAll('.image-slider .swiper-slide');
    slides.forEach(slide => {
      slide.addEventListener('click', function() {
        const title = this.getAttribute('data-title');
        const description = this.getAttribute('data-description');
        const imgSrc = this.querySelector('img').src;
        
        showImagePopup(imgSrc, title, description);
      });
    });
    
    // Pause autoplay on hover
    const imageSliderContainer = document.querySelector('.image-slider');
    if (imageSliderContainer) {
      imageSliderContainer.addEventListener('mouseenter', function() {
        imageSwiper.autoplay.stop();
      });
      
      imageSliderContainer.addEventListener('mouseleave', function() {
        imageSwiper.autoplay.start();
      });
    }
  }
  
  // Logo Slider initialization
  function initLogoSlider() {
    // Initialize Swiper for logo slider
    const logoSwiper = new Swiper('.logo-slider', {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        // when window width is <= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        // when window width is <= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is <= 768px
        768: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        // when window width is > 992px
        992: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      }
    });
    
    // Pause on hover
    const logoSliderContainer = document.querySelector('.logo-slider');
    if (logoSliderContainer) {
      logoSliderContainer.addEventListener('mouseenter', function() {
        logoSwiper.autoplay.stop();
      });
      
      logoSliderContainer.addEventListener('mouseleave', function() {
        logoSwiper.autoplay.start();
      });
    }
  }
  
  // Image Popup Modal functionality
  function initImagePopup() {
    const modal = document.getElementById('image-popup-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    
    // Close modal when clicking close button
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        closeImagePopup();
      });
    }
    
    // Close modal when clicking outside
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeImagePopup();
        }
      });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeImagePopup();
      }
    });
  }
  
  function showImagePopup(imgSrc, title, description) {
    const modal = document.getElementById('image-popup-modal');
    const modalImg = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    
    // Set content
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    
    // Show modal
    modal.style.display = 'flex';
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
  }
  
  function closeImagePopup() {
    const modal = document.getElementById('image-popup-modal');
    
    // Hide modal
    modal.style.display = 'none';
    
    // Allow scrolling again
    document.body.style.overflow = '';
  }