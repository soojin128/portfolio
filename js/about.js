window.addEventListener("DOMContentLoaded", function () {
  let back = document.querySelector('.back');
  let contents = document.querySelector('.contents');
  let fixEle = document.querySelector('.info');
  let h1 = document.querySelectorAll('.content h1');
  let closeDoor = document.querySelector('.close-door');
  let contentTxt = document.querySelector('.content article');
  let _scroll = document.querySelector('.scroll');

  //back btn
  back.addEventListener('mouseover', () => {
    closeDoor.style.transform = 'translateX(-99%)';
  });
  back.addEventListener('mouseleave', () => {
    closeDoor.style.transform = 'translateX(-100%)';
  });
  back.addEventListener('click', function () {
    closeDoor.classList.add('active');
    setTimeout(function () {
      location.href = 'portfolio.html';
    }, 500);
  });

  // text animation
  function h1Slide() {
    h1.forEach((e, i) => {
      setTimeout(function () {
        h1[i].classList.add('active');
      }, 500 * (i + 1));
    });
  }

  //load event
  window.addEventListener('load', function () {
    fixEle.style.opacity = '1';
    back.style.opacity = '1';
    h1Slide();
    setTimeout(function () {
      contentTxt.style.opacity = 1;
    }, 2600);
    setTimeout(function () {
      _scroll.style.opacity = '1';
    }, 3000);
  });


  let winHeight = document.documentElement.clientHeight;
  let scroll = 0;
  let skills = document.querySelector('.skills');
  let info = document.querySelector('.info');
  window.addEventListener('wheel', (e) => {

    if (e.deltaY < 0) {
      if (scroll > 0) {
        scroll -= 100;
      }
      scrollUp();
    } else {
      if (scroll < contents.offsetHeight - winHeight) {
        scroll += 100;
      }
      scrollDown();
    }
  });

  function scrollUp() {
    if (scroll >= 0) {
      contents.style.top = -scroll + 'px';
      info.style.top = -scroll + 'px';
    }
  }

  function scrollDown() {
    contents.style.top = -scroll + 'px';
    info.style.top = -scroll + 'px';
    if (scroll > 200) {
      setTimeout(function () {
        skills.classList.add('active');
      }, 300);
    }

  }
});