function addScript () {
  var url = [
    'data_request.js',
    'server.js'
  ]
  for (var i in url) {
    document.write("<script language=javascript src=" + url[i] + "></script>");
  }
}

var file;
var fileURL;
let ifChangeColor = 0;
var tmpObj;
var tmpMaterial;
var targetID = '';
var targetColor = '';

var parts_id = server_partID;
var letters = server_partLetter;
var colors = [0x696969, 0x696969, 0x696969, 0x696969, 0x696969, 0x696969, 0x696969, 0x696969];

var OBJLoader = new THREE.OBJLoader();
var MTLLoader = new THREE.MTLLoader();

if (localStorage.getItem('ifSaved') && window.indexedDB) {
  document.getElementById('now').innerHTML = '正在从浏览器缓存中载入模型<br>稍后会出现蓝色背景, 请耐心等待';

  var request = window.indexedDB.open("moduleDB", 1);
  var db;

  request.onsuccess = function (event) {
    db = request.result;

    var objectStore = db
      .transaction("module")
      .objectStore("module");

    objectStore.openCursor().onsuccess = function (e) {
      var item = e.target.result;
      if (item) {
        file = new File([item.value.content], 'WaterPump.obj');
        fileURL = window.URL.createObjectURL(file);
        fun0();
      }
      else {
        console.log("Failed to reach database.");
        localStorage.clear();
        this.location = location;
      }
    }
  }

  request.onerror = function (e) {
    console.log("Failed to reach database");
    localStorage.clear();
    this.location = location;
  }
}
else {
  var addProgressForXhr = (fn) => {
    var xhr = $.ajaxSettings.xhr()
    if (typeof fn == "function") {
      xhr.onprogress = fn;
    }
    return () => xhr
  }

  $.ajax({
    url: moduelPath,
    xhr: addProgressForXhr(function (e) {
      var currentPercent = (e.loaded / e.total * 100).toFixed(0);
      document.getElementById('progress').innerHTML = (e.loaded / 1048576).toFixed(0) + 'MB / ' + (e.total / 1048576).toFixed(0) + 'MB (' + currentPercent + '%)';
      document.getElementsByClassName('innerLoadbar')[0].style.width = currentPercent * 3 + 'px';
      if (currentPercent > 95) {
        document.getElementById('now').innerHTML = '即将完成模型下载<br>模型下载后将开始载入模型, 届时会出现蓝色背景, 请耐心等待';
      }
    }),
    async: true,
    success: function (data, status, xhr) {
      file = new File([data], 'WaterPump.obj');
      fileURL = window.URL.createObjectURL(file);

      fun0();

      if (window.indexedDB) {
        var request = window.indexedDB.open("moduleDB", 1);
        var db;

        request.onupgradeneeded = function (e) {
          db = e.target.result;
          var objectStore = db.createObjectStore("module", {
            keyPath: "id"
          });
        }

        request.onsuccess = function (e) {
          db = request.result;
          addRecord();
        }

        request.onerror = function (e) {
          console.log("Failed to create database.");
        }

        function addRecord () {
          var request = db.transaction(["module"], "readwrite")
            .objectStore("module")
            .add({ id: 1, content: data });
          request.onsuccess = function (e) {
            localStorage.setItem('ifSaved', true);
          }
          request.onerror = function (e) {
            console.log("Failed to save module to local browser.");
          }
        }
      }
    }
  })
}


function fun0 () {
  if (ifChangeColor == 1) {
    fun1(tmpMaterial);
    return;
  }
  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(-400, 75, 0)
  scene.add(camera);

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xb9d3ff, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var light = new THREE.SpotLight(0xffffff);
  light.position.set(400, 75, 0);
  scene.add(light);
  var light_back = new THREE.SpotLight(0xffffff);
  light_back.position.set(-400, 75, 0);
  scene.add(light_back);

  function fun1 (materials) {
    OBJLoader.setMaterials(materials);
    if (ifChangeColor == 1) {
      fun2(tmpObj);
      return;
    }
    tmpMaterial = materials;

    function fun2 (obj) {
      if (ifChangeColor == 1) {
        changePartColor();
        return;
      }
      tmpObj = obj;
      obj.traverse(function (child) {
        child.material = new THREE.MeshPhongMaterial({ color: 0x696969 });
      })

      obj.scale.set(0.5, 0.5, 0.5);
      scene.add(obj);
      obj.position.set(0, -125, 0)
      renderer.render(scene, camera);
      window.addEventListener('click', onModelClick);

      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();

      function onModelClick (event) {
        event.preventDefault();
        OBJLoader.setMaterials(materials);
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(obj.children);
        if (intersects.length > 0) {
          obj.traverse(function (child) {
            child.material.color.set(0x696969);
          })

          var i = 0;
          for (i in letters) {
            if (letters[i] == intersects[0].object.name) {
              window.top.app_view.showList(parts_id[i]);
              return;
            }
          }
        }
      };

      function changePartColor () {
        for (var i in parts_id) {
          if (parts_id[i] == targetID) {
            colors[i] = targetColor;
            break;
          }
        }
        tmpObj.traverse(function (child) {
          for (var j in letters) {
            if (child.name == letters[j]) {
              child.material.color.set(colors[j]);
            }
          }
        });
        return;
      }
    }
    OBJLoader.load(fileURL, fun2);
  }
  MTLLoader.load('./res/lib/lib2/WaterPump.mtl', fun1);

  function render () {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.0;;
  function animate () {
    controls.update();
    requestAnimationFrame(animate);
  }
  animate();

  document.getElementById('load').style.display = 'none';
  var colorButtons = window.parent.document.getElementsByTagName('button');
  for (var i in colorButtons) {
    colorButtons[i].disabled = '';
  }
}

function partColorChanger (id, color) {
  ifChangeColor = 1;
  if (id !== 'fixer') {
    targetID = id;
    targetColor = color;
  }
  fun0();
  ifChangeColor = 0;
}
