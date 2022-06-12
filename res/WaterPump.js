function addScript () {
  var url = [
    'data_request.js'
  ]
  for (var i in url) {
    document.write("<script language=javascript src=" + url[i] + "></script>");
  }
}

var scene = new THREE.Scene();
let ifChangeColor = 0;
var tmpObj;
var targetID = '';
var targetColor = '';

var parts_id = ['PRT0172_1090', 'PRT0161_1036', 'PRT0164_1028', 'PRT0026_159', 'PRT0039_230', 'PRT0043_234', 'PRT0149_912', 'PRT0103_683'];
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
var colors = [0x696969, 0x696969, 0x696969, 0x696969, 0x696969, 0x696969, 0x696969, 0x696969];

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

var OBJLoader = new THREE.OBJLoader();
var MTLLoader = new THREE.MTLLoader();

function fun1 (materials) {
  OBJLoader.setMaterials(materials);
  if (ifChangeColor == 1) {
    fun2(tmpObj);
    return;
  }

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

    document.getElementById('load').style.display = 'none';
  }
  OBJLoader.load('http://119.91.146.51:8080/WaterPump.obj', fun2);
  //'http://119.91.146.51:8080/WaterPump.obj'
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

function partColorChanger (id, color) {
  ifChangeColor = 1;
  if (id !== 'fixer') {
    targetID = id;
    targetColor = color;
  }
  fun1();
  ifChangeColor = 0;
}
