
let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector("#login-btn");
let loginForm = document.querySelector(".login-form-container");
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () =>{
    // searchBtn.classList.remove('fa-times');
    // searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

// searchBtn.addEventListener('click', () =>{
//     searchBtn.classList.toggle('fa-times');
//     searchBar.classList.toggle('active');
// });

formBtn.addEventListener('click', () =>{
    loginForm.classList.toggle('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    slidesPerView: 1,
    // slidesPerGroup: 1,
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});





function loadingAnimation() {
    var tl = gsap.timeline();
  
    tl.from(".line h1", {
      y: 150,
      stagger: 0.6,
      duration: 0.3,
      onComplete: function () {
        gsap.to(".line h1", { opacity: 0, duration: 3 });
      },
    });
  
    tl.to("#plane", {
      x: -2500,
      duration: 3,
      // delay: 0.1, // Adding a slight delay to ensure h1 elements are hidden before plane animation starts
      onComplete: function () {
        gsap.to("#loader", {
          opacity: 0,
          duration: 0.2,
          onComplete: function () {
            document.getElementById("loader").style.display = "none";
            pageAnimations();
          },
        });
      },
    });
  }
  
  function pageAnimations() {
    // Animate the 'book now' spans
    gsap.from(".heading span", {
      y: -100,
      opacity: 0,
      duration: 2,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        // Optional: Add scroll trigger if you want animation on scroll
        trigger: ".book .packages .services .gallery .review",
        start: "top 100px",
        // markers: true,
        scrub: 2,
      },
    });
  }
  
  loadingAnimation();
  
  var tm = gsap.timeline();
  tm.to(".heading span", {
    y: 100,
    duration: 2,
    stagger: 0.2,
  });



  