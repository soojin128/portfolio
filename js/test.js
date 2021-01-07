window.addEventListener("DOMContentLoaded", function () {
  let speed = 0;
  let position = 0;
  let rounded = 0;
  let wrap = document.querySelector('.wrap');
  let elems = document.querySelectorAll('.n');
  window.addEventListener('wheel', (e) => {
    speed += e.deltaY * 0.0003;
  });

  let objs = Array(5).fill({
    dist: 0
  });

  function raf() {
    position += speed;
    speed *= 0.8;

    rounded = Math.round(position);

    let diff = (rounded - position);

    position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;

    wrap.style.transform = 'translate(0,' + (-position * 500 + 50) + 'px)';

    objs.forEach((o, i) => {
      o.dist = Math.min(Math.abs(position - i), 1);
      o.dist = 1 - o.dist ** 2;
      elems[i].style.transform = 'scale(' + (1 + 0.4 * o.dist) + ')';
      elems[i].classList.remove('active');
      if (elems[i].style.transform === 'scale(1.4)') {
        elems[i].classList.add('active');
      }
    });

    window.requestAnimationFrame(raf);
  }

  raf();


  let seeMore = document.querySelectorAll('.texts a');
  let descript = document.querySelectorAll('.descript');
  let imgSpot = document.querySelectorAll('.spot');
  let title = document.querySelectorAll('.texts h1');
  let titleSpot = document.querySelectorAll('.spot-wrap h1');

  seeMore.forEach((e, i) => {

    e.addEventListener('mouseenter', function () {
      descript[i].classList.add('active');
    });

    e.addEventListener('mouseleave', function () {
      descript[i].classList.remove('active');
    });

    e.addEventListener('click', function (e) {
      e.preventDefault();
      descript[i].classList.add('fullPage');
      imgSpot[i].classList.add('active');
      imgs[i].classList.add('active');
      title[i].classList.add('active');
      titleSpot[i].classList.add('active');
      goPage(e, i);
    });
  });

  let imgs = document.querySelectorAll('.img-wrap img');
  imgs.forEach((e, i) => {
    e.addEventListener('click', function () {
      descript[i].classList.add('fullPage');
      imgSpot[i].classList.add('active');
      imgs[i].classList.add('active');
      title[i].classList.add('active');
      // titleSpot[i].classList.add('active');
      goPage(e, i);
    });
  });

  let pages = ['olympus_des.html', 'genesis_des.html'];

  function goPage(e, i) {
    setTimeout(function () {
      window.location.href = pages[i];
    }, 500);
  }
});