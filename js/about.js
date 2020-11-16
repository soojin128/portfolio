window.addEventListener("DOMContentLoaded", function () {
  let back = document.querySelector('.back');
  let h1 = document.querySelector('.content h1');
  let closeDoor = document.querySelector('.close-door');

  back.addEventListener('click', function () {
    closeDoor.classList.add('active');
    setTimeout(function () {
      location.href = 'portfolio.html';
    }, 500);
  });

  window.addEventListener('load', function () {
    back.classList.add('active');
    h1.classList.add('active');
  });

  let content = document.querySelector('.content');
  let scroll = 0;
  window.addEventListener('wheel', function (e) {
    if (e.deltaY < 0) {
      if (scroll > 0) {
        scroll -= 30;
      }
      scrollUp();
    } else {
      if (scroll < content.offsetHeight-990) {
        scroll += 30;
      }
      scrollDown();
    }


  });

  function scrollUp() {
    if (scroll >= 0) {
      content.style.top = - scroll + 'px';
    }
  }

  function scrollDown() {
    content.style.top = - scroll + 'px';
  }


});