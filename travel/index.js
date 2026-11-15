console.log("Score-100/100 \n 1.Верстка валидная \n 2.Присутствуют все самантические теги \n 3.Верскта соответсвует макету \n 4.требование к css соответсвует всем пунктам \n 5.Интерактивность через css соответствует всем пунктам");

const menu = document.querySelector(".menu_mobile");
const menuItems = document.querySelectorAll(".menu_items");
const burger= document.querySelector(".burger");
const closeIcon= document.querySelector(".close_icon");

closeIcon.addEventListener('click', function() {
  menu.style.transform="translatex(100%)";
}); 
burger.addEventListener('click', function(){
 menu.style.transform="translatex(0%)";
});






const sliderLine = document.querySelector('.destination'),
 prevButton =document.querySelector(".destination_1"),
 nextButton =document.querySelector(".destination_3"),
 centrButton =document.querySelector(".destination_2"),
 dots = document.querySelectorAll(".circle");
 

 let position = 0
     
     const nextSlade =() => {
      position = 1777
      sliderLine.style.left = -position + 'px'
      dots[2].classList.add("bg_after")
      dots[0,1].classList.remove("bg_after")
      }
      nextButton.addEventListener('click',nextSlade)

     const prevSlade =() => {
      position = 199
      sliderLine.style.left = position + 'px'
      dots[0].classList.add("bg_after")
      dots[2,1].classList.remove("bg_after")
     }
      prevButton.addEventListener('click',prevSlade)

     const centrbutton =() => {
      position = 780
      sliderLine.style.left = -position + 'px'
      dots[1].classList.add("bg_after")
      dots[2].classList.remove("bg_after")
      dots[0].classList.remove("bg_after")

     }
      centrButton.addEventListener('click',centrbutton)

      let slideIndex = 0;
      const slidesCount = 3;
      const showMobileSlide = () => {
        sliderLine.style.left = -slideIndex * sliderLine.parentElement.clientWidth + 'px';
      };

      document.querySelector(".arrow").addEventListener('click' , function(){
            slideIndex = (slideIndex + 1) % slidesCount;
            showMobileSlide();
      });

      document.querySelector(".arrow_one").addEventListener('click' , function(){
            slideIndex = (slideIndex - 1 + slidesCount) % slidesCount;
            showMobileSlide();
      });

      window.addEventListener('resize', showMobileSlide);















