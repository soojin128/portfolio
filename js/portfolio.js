window.addEventListener("DOMContentLoaded", function () {

  let data = new XMLHttpRequest();
  let response;
  let wrap = document.querySelector('.wrap');
  let spotWrap = document.querySelector('.spot-wrap');
  let spotWrapEle = '';
  let wrapEle = '';
  let elems, imgs, pages, seeMore, descript, imgSpot, title, titleSpot, body, texts, imgWrap;
  let colors = [];

  data.open('get', 'data.json', true);
  data.send(null);

  data.addEventListener('load', dataFun);

  //data load event
  function dataFun() {
    response = JSON.parse(data.responseText);
    wrapEle.innerHTML = '';

    response.items.forEach(function (el, idx) {
      wrapEle = "<div class='n " + 'n' + idx + "'>"
      wrapEle += "<div class='texts'>"
      wrapEle += "<h1>" + el.name + "</h1>"
      wrapEle += "<p>" + el.subtitle + "</p>"
      wrapEle += "<a href='#'>자세히 보기</a>"
      wrapEle += "</div>"

      wrapEle += "<div class='img-wrap'>"
      wrapEle += "<img src=" + el.thumb + " alt=''>"
      wrapEle += "</div>"
      wrapEle += "</div>"

      spotWrapEle = "<h1>" + el.name + "</h1>"
      spotWrapEle += "<img class='spot' src='" + el.thumb + "' alt=''></img>"

      wrap.innerHTML += wrapEle;
      spotWrap.innerHTML += spotWrapEle;

    });

    elems = document.querySelectorAll('.n');
    imgWrap = document.querySelectorAll('.img-wrap');
    imgs = document.querySelectorAll('.img-wrap img');
    seeMore = document.querySelectorAll('.texts a');
    descript = document.querySelectorAll('.descript');
    imgSpot = document.querySelectorAll('.spot');
    title = document.querySelectorAll('.texts h1');
    titleSpot = document.querySelectorAll('.spot-wrap h1');
    pages = ['olympus_des.html', 'genesis_des.html'];
    body = document.querySelector('body');
    colors = ['#cee4f5', '#dfcef5', ' #cef5d7', ' #f4f5ce', ' #f5d4ce'];
    texts = document.querySelectorAll('.texts');

    raf();
    imgsFor();
    seemoreFor();
  }

  let attractMode = false;
  let attractTo = 0;
  let speed = 0;
  let position = 0;
  let rounded = 0;

  window.addEventListener('wheel', (e) => {
    speed += e.deltaY * 0.0003;
  });

  let objs = Array(5).fill({
    dist: 0
  });

  // mousewheel event
  function raf() {
    position += speed;
    speed *= 0.8;
    if (Math.round(position) >= 0) {
      if (Math.round(position) < 5) {
        rounded = Math.round(position);
      }
    }
    let diff = (rounded - position);

    if (attractMode) {
      position += -(position - attractTo) * 0.04;
      wrap.style.transform = 'translate(0,' + (-position * 500 + 50) + 'px)';
    } else {
          position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;
          wrap.style.transform = 'translate(0,' + (-position * 500 + 50) + 'px)';
    }

    // imgs scale change && nav style change
    objs.forEach((o, i) => {
      o.dist = Math.min(Math.abs(position - i), 1);
      o.dist = 1 - o.dist ** 2;
      if (attractMode) {
        body.style.backgroundColor = '#000';
        elems[i].style.transform = 'scale(1.2)';
        imgWrap[i].style.transform = ' translateX(-60%)';
      } else {
        imgWrap[i].style.transform = ' translateX(0)';
        elems[i].style.transform = 'scale(' + (1 + 0.4 * o.dist) + ')';
        backgroundFun();
      }
      elems[i].classList.remove('active');
      if (i == Math.round(position)) {
        elems[i].classList.add('active');
      }
    });
    window.requestAnimationFrame(raf);
  }


  // see more event
  function seemoreFor() {
    seeMore.forEach((e, i) => {

      e.addEventListener('mouseenter', () => {
        descript[i].classList.add('active');
      });

      e.addEventListener('mouseleave', () => {
        descript[i].classList.remove('active');
      });

      e.addEventListener('click', (e) => {
        e.preventDefault();
        descript[i].classList.add('fullPage');
        imgSpot[i].classList.add('active');
        imgs[i].classList.add('active');
        title[i].classList.add('active');
        titleSpot[i].classList.add('active');
        goPage(e, i);
      });
    });
  }

  // imgs click event
  function imgsFor() {
    imgs.forEach((e, i) => {
      e.addEventListener('click', function () {
        descript[i].classList.add('fullPage');
        imgSpot[i].classList.add('active');
        imgs[i].classList.add('active');
        title[i].classList.add('active');
        titleSpot[i].classList.add('active');
        goPage(e, i);
      });
    });
  }

  // page change event
  function goPage(e, i) {
    setTimeout(function () {
      window.location.href = pages[i];
    }, 500);
  }

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

  // body background color
  function backgroundFun() {
    colors.forEach((e, i) => {
      if (i == rounded) {
        body.style.backgroundColor = colors[i];
        body.style.transition = '.5s';
      }
    });
  }

  // nav
  let nav = document.querySelector('.nav');
  let navs = nav.querySelectorAll('li');

  nav.addEventListener('mouseenter', () => {
    attractMode = true;
  });

  nav.addEventListener('mouseleave', () => {
    attractMode = false;
  });

  navs.forEach(el => {
    el.addEventListener('mouseover', (e) => {
      attractTo = Number(e.target.getAttribute('data-nav'));
    });
  });
});