window.addEventListener("DOMContentLoaded", function () {


  window.addEventListener('load', () => {
    title.style.top = '45%';
    downBtn.style.opacity = 1;
    title.style.opacity = 1;
  });

  // back btn
  let back = document.querySelector('.back');
  let closeDoor = document.querySelector('.close-door');

  back.addEventListener('click', function () {
      closeDoor.classList.add('active');
      setTimeout(function () {
        location.href = 'portfolio.html';
      }, 600);
    });
    back.addEventListener('mouseover', () => {
      closeDoor.style.transform = 'translateX(-99%)';
    });
    back.addEventListener('mouseleave', () => {
      closeDoor.style.transform = 'translateX(-100%)';
    });

  // downBtn
  let downBtn = document.querySelector('.header span');
  downBtn.addEventListener('click', () => {
    contents.style.top = 0;
    contents.style.transition = '.5s';
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
    footerFun();
  });

  function scrollUp() {
    if (scroll >= 0) {
      if (scroll <= 300) {
        img.style.transform = 'scale(' + (1.2 - scroll * 0.0008) + ') rotate(' + scroll * 0.06 + 'deg)';
        title.style.transform = 'translateY(' + scroll * 0.1 + 'px)';
      }
    }
    contents.style.top = winHeight - scroll + 'px';
    if (scroll < footerHeight) {
      footer.style.bottom = '-' + footerHeight + 'px';
    }
  }

  function scrollDown() {
    if (scroll <= 300) {
      img.style.transform = 'scale(' + (1.2 - scroll * 0.0008) + ') rotate(' + scroll * 0.06 + 'deg)';
      title.style.transform = 'translateY(' + scroll * 0.6 + 'px)';
    }

    contents.style.top = winHeight - scroll + 'px';
    if (scroll > footerHeight + 60) {
      footer.style.bottom = 0;
    }
  }

  //footer event
  let footerTxt = document.querySelector('.footer h1');

  function footerFun() {
    if (scroll > contentsHeight - (footerHeight / 4)) {
      footerTxt.style.top = '46%';
      goNext.style.opacity = 1;
    } else {
      footerTxt.style.top = '100%';
      goNext.style.opacity = 0;
    }
  }

  //go page
  let goOlympus = document.querySelector('.spec li a');
  goOlympus.addEventListener('click', (e) => {
    e.preventDefault();
    window.open('https://soojin128.github.io/project/index_test.html', 'olympus');
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

  aboutBtn.addEventListener('mouseover', function () {
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

  // touch event
  let clientY, deltaY = 0,
    move = 0;

  window.addEventListener('touchstart', (e) => {
    clientY = e.changedTouches[0].clientY;
  });

  window.addEventListener('touchmove', (e) => {
    deltaY = e.changedTouches[0].clientY;

    if (clientY - deltaY > 0) {
      if (move <= contents.offsetHeight + footerHeight) {
        move += 20;
      }
    } else {
      if (move >= 0) {
        move -= 20;
      }
    }
    if (move > contentsHeight + (footerHeight / 2)) {
      goNext.style.opacity = 1;
      if (document.documentElement.clientWidth > 1024) {
        footerTxt.style.top = '46%';
      } else {
        footerTxt.style.top = '45%';
      }

    } else {
      goNext.style.opacity = 0;
      footerTxt.style.top = '100%';
    }

    if (move > footerHeight + 60) {
      footer.style.bottom = 0;
    } else {
      footer.style.bottom = '-100%';
    }
    deltaY = clientY - deltaY;
    contents.style.top = winHeight - move + 'px';
  });

});