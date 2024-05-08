
let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active')
}
document.querySelector('#close-login-btn').onclick = () =>{
    loginForm.classList.remove('active')
}
//   featured swiper
//   featured swiper

var swiper = new Swiper(".adventure-slider", {
    spacebetween:25,
    loop:true,
    centreredSlides :true,
    autoplay:{
        delay:9500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    breakpoints: {
      0: {
        slidesPerView: 1,
        
      },
      450: {
        slidesPerView: 2,
        
      },
      768: {
        slidesPerView: 3,
        
      },
      1024: {
        slidesPerView: 4,
        
      },
    },
  });