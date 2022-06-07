document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
})

// console.log(window.location.href);
// if (/view.html$/.test(window.location.href)) {
//   sessionStorage.clear();
// }

function changetab (string) {
  switch (string) {
    case 'view':
      window.location.href = "./view.html";
      break;
    case 'data':
      window.location.href = "./data.html";
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