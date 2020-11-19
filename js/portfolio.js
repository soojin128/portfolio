window.addEventListener("DOMContentLoaded", function () {

  let data = new XMLHttpRequest();
  let response;
  let wrap = document.querySelector('.wrap');
  let spotWrap = document.querySelector('.spot-wrap');
  let spotWrapEle = '';
  let wrapEle = '';
  let elems, imgs, pages, seeMore, descript, imgSpot,
    title, body, texts, imgWrap, loader, header;
  let colors = [];

  function variableFun() {
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
    loader = document.querySelector('.loader');
    header = document.querySelector('.header');
  }

  //data load
  data.open('get', 'data.json', true);
  data.send(null);

  data.addEventListener('load', dataFun);

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

      spotWrapEle = "<img class='spot' src='" + el.thumb + "' alt=''></img>"

      wrap.innerHTML += wrapEle;
      spotWrap.innerHTML += spotWrapEle;
    });
    variableFun();
    body.style.backgroundColor = '#000';
    loadFun();
  }

  //loading animation
  function loadFun() {
    setTimeout(function () {
      loader.style.display = 'none';
      header.style.opacity = '1';
      indi.style.opacity = '1';
    }, 2500);

    setTimeout(function () {
      raf();
    }, 2000);
  }

  let attractMode = false;
  let attractTo = 0;
  let speed = 0;
  let position = 0;
  let rounded = 0,
    one = true;

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
      position += -(position - attractTo) * 0.05;
      wrap.style.transform = 'translate(0,' + (-position * 500 + 50) + 'px)';
    } else {
      position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;
      wrap.style.transform = 'translate(0,' + (-position * 500 + 50) + 'px)';
    }

    // imgs scale, nav style, backgroundColor 
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

      //loading animation
      setTimeout(function () {
        texts[i].style.opacity = '1';
      }, 1000);

      if (one) {
        elems[0].style.transition = '1s';
        one = false;
        quitTransition();
      }
    });

    imgsFor();
    seemoreFor();
    navFun();
    window.requestAnimationFrame(raf);
  }

  function quitTransition() {
    setTimeout(function () {
      elems[0].style.transition = '0.2s';
    }, 1000);
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
        goPage(e, i);
      });
    });
  }

  // page change event
  function goPage(e, i) {
    setTimeout(function () {
      window.location.href = pages[i];
    }, 250);
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
  let indi = document.querySelector('.indi');
  let indis = document.querySelectorAll('.indi li');

  function navFun() {
    nav.addEventListener('mouseenter', () => {
      attractMode = true;
      nav.style.opacity = '1';
      indi.classList.add('active');
    });

    nav.addEventListener('mouseleave', () => {
      attractMode = false;
      nav.style.opacity = '0';
      indi.classList.remove('active');
    });

    navs.forEach((el, i) => {
      el.addEventListener('mouseover', (e) => {
        attractTo = Number(e.target.getAttribute('data-nav'));
        indis[i].classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        indis[i].classList.remove('active');
      });
      el.addEventListener('click', () => {
        attractMode = false;
      });
    });

    indi.addEventListener('mouseover', () => {
      nav.style.opacity = '1';
      indi.classList.add('active');
    });

    indi.addEventListener('mouseleave', () => {
      nav.style.opacity = '0';
      indi.classList.remove('active');
    });
  }

});