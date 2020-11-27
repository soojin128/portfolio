window.addEventListener("DOMContentLoaded", function () {


  window.addEventListener('load', () => {
    if (document.documentElement.clientWidth >= 1440) {
      title.style.top = '41%';
    } else {
      downBtn.style.opacity = 1;
      title.style.opacity = 1;
    }
  });

  // back btn
  let back = document.querySelectorAll('.back');
  let closeDoor = document.querySelector('.close-door');

  back.forEach((e) => {
    e.addEventListener('click', function () {
      closeDoor.classList.add('active');
      setTimeout(function () {
        location.href = 'portfolio.html';
      }, 600);
    });
  });

  // mousewheel
  let header = document.querySelector('.header');
  let title = header.querySelector('h1');
  let contents = document.querySelector('.contents');
  let footer = document.querySelector('.footer');
  let img = header.querySelector('img');
  let contentsHeight = contents.offsetHeight;
  let footerHeight = footer.offsetHeight;
  let winHeight = document.documentElement.clientHeight;
  let scroll = 0;

  window.addEventListener('mousewheel', (e) => {
    // if (document.documentElement.clientWidth >= 1440) {
    if (e.deltaY < 0) {
      if (scroll > 0) {
        scroll -= 100;
      }
      scrollUp();
    } else {
      if (scroll < contentsHeight + footerHeight) {
        scroll += 100;
      }
      scrollDown();
    }
    // }
  });

  function scrollUp() {
    if (scroll >= 0) {
      if (scroll <= 300) {
        if (document.documentElement.clientWidth > 1024) {
          img.style.transform = 'scale(' + (1.2 - scroll * 0.0008) + ') rotate(' + scroll * 0.06 + 'deg)';
        }
        title.style.transform = 'translateY(' + scroll * 0.1 + 'px)';
      }
    }
    contents.style.top = winHeight - scroll + 'px';
    if (scroll < footerHeight + 50) {
      footer.style.bottom = '-' + footerHeight + 'px';
    }
  }

  function scrollDown() {
    if (scroll <= 300) {
      if (document.documentElement.clientWidth > 1024) {
        img.style.transform = 'scale(' + (1.2 - scroll * 0.0008) + ') rotate(' + scroll * 0.06 + 'deg)';
      }
      title.style.transform = 'translateY(' + scroll * 0.6 + 'px)';
    }
    contents.style.top = winHeight - scroll + 'px';
    if (scroll > footerHeight + 50) {
      footer.style.bottom = 0;
    }
  }

  //go page
  let goOlympus = document.querySelector('.about-project a');
  goOlympus.addEventListener('click', () => {
    window.open('https://soojin128.github.io/project/index.html', 'olympus');
  });

  //next btn
  let goNext = document.querySelector('.go-next');
  goNext.addEventListener('click', (e) => {
    e.preventDefault();
    location.href = 'genesis_des.html';
  });

  // about page
  let about = document.querySelector('.about');
  let aboutBtn = document.querySelector('.about-btn');

  aboutBtn.addEventListener('mouseenter', function () {
    about.classList.add('active');
  });

  aboutBtn.addEventListener('mouseleave', function () {
    about.classList.remove('active');
  });

  aboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    about.classList.add('fullPage');
    setTimeout(function () {
      location.href = "about.html";
    }, 500);

  });

  // downBtn
  let downBtn = document.querySelector('.header span');
  downBtn.addEventListener('click', () => {
    contents.style.top = 0;
    contents.style.transition = '.5s';
  });

  // touch event
  let clientY, deltaY = 0,
    move = 0;

  window.addEventListener('touchstart', (e) => {
    clientY = e.changedTouches[0].clientY;
  });

  window.addEventListener('touchmove', (e) => {
    deltaY = e.changedTouches[0].clientY;
    if (move <= contents.offsetHeight + footerHeight) {
        if (clientY - deltaY > 0) {
          move += 30;
        } else {
          move -= 30;
        }
    }
    if(move>footerHeight){
      footer.style.bottom = 0;
    }else{
      footer.style.bottom = '-100%';
    }
    deltaY = clientY - deltaY;
    contents.style.transform = 'translateY(-' + move + 'px)';
  });

  window.addEventListener('touchend', () => {
    contents.style.transform = 'translateY(-' + move + 'px)';
    // contents.style.transform = 'translateY(' + deltaY + 'px)';
  });
});