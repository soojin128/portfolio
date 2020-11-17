window.addEventListener("DOMContentLoaded", function () {
  let back = document.querySelector('.back');
  let contents = document.querySelector('.contents');
  let backColor = document.querySelector('.contents span');
  let h1 = document.querySelectorAll('.contents h1');
  let closeDoor = document.querySelector('.close-door');

  //back btn
  back.addEventListener('click', function () {
    closeDoor.classList.add('active');
    setTimeout(function () {
      location.href = 'portfolio.html';
    }, 500);
  });

  // text animation
  function h1Slide() {
    h1.forEach((e,i) =>{
      setTimeout(function() {
        h1[i].classList.add('active');
      },300*(i+1));
    });
  }

  //load event
  window.addEventListener('load', function () {
    backColor.style.opacity = '1';
    back.style.opacity = '1';
    h1Slide();
  });
  
  let winHeight = document.documentElement.clientHeight;
  let scroll = 0;
  window.addEventListener('wheel', (e) => {
    if (e.deltaY < 0) {
      if (scroll > 0) {
        scroll -= 100;
      }
      scrollUp();
    } else {
      if (scroll < contents.offsetHeight-winHeight) {
        scroll += 100;
      }
      scrollDown();
    }
  });

  function scrollUp() {
    if (scroll >= 0) {
      contents.style.top = - scroll + 'px';
    }
  }

  function scrollDown() {
    contents.style.top = - scroll + 'px';
  }

});