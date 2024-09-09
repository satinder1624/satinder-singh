document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburgerMenu');
  const crossMenu = document.querySelector('.crossMenu');

  const phoneMenu = document.querySelector('.headerSmallHide');
  const tabletMenu = document.querySelector('.headerBig');

  hamburgerMenu.addEventListener('click', function () {
    hamburgerMenu.classList.add('hamburgerHideAtAction');
    phoneMenu.classList.add('headerSmallShow');
    crossMenu.classList.add('crossMenuShow');
  });

  crossMenu.addEventListener('click', function () {
    hamburgerMenu.classList.remove('hamburgerHideAtAction');
    phoneMenu.classList.remove('headerSmallShow');
    crossMenu.classList.remove('crossMenuShow');
  });
});
