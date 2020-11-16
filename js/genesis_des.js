window.addEventListener("DOMContentLoaded", function () {

  let back = document.querySelectorAll('.back');
  let closeDoor = document.querySelector('.close-door');

  back.forEach((e, i) => {
    e.addEventListener('click', function () {
      closeDoor.classList.add('active');
      setTimeout(function () {
        location.href = 'portfolio.html';
      }, 600);
    });
  });

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
  });

  function scrollUp() {
    if (scroll >= 0) {
      if (scroll <= 300) {
        img.style.transform = 'scale(' + (1.2 - scroll * 0.0008) + ') rotate(' + scroll * 0.06 + 'deg)';
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
      img.style.transform = 'scale(' + (1.2 - scroll * 0.0008) + ') rotate(' + scroll * 0.06 + 'deg)';
      title.style.transform = 'translateY(' + scroll * 0.6 + 'px)';
    }
    contents.style.top = winHeight - scroll + 'px';

    if (scroll > footerHeight + 50) {
      footer.style.bottom = 0;
    }
  }

});