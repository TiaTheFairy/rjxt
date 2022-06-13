document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
})

if (/^https/.test(window.location.href)) {
  window.location.href = window.location.href.replace('https', 'http');
}

function changetab (string) {
  switch (string) {
    case 'view':
      window.location.href = "./index.html";
      // window.location.href = "http://rjxt.mcfl.top";
      break;
    case 'data':
      window.location.href = "./data.html";
      // window.location.href = "http://rjxt.mcfl.top/data.html";
      break;
    default:
      break;
  }
}

function resizeWindow () {
  if (document.fullscreenElement) {
    if (document.exitFullScreen) {
      document.exitFullscreen()
    }
    if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    }
    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
    if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }
  else {
    if (document.documentElement.RequestFullScreen) {
      document.documentElement.RequestFullScreen();
    }
    if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    }
    if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen();
    }
    if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  }
}
