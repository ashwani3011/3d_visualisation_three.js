import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import typeBasedArray from "./cleanData.js";

let gui = new dat.GUI();

// console.log(typeBasedArray)

// typeBasedArray.forEach((object)=>{
//     console.log(object)
// })

const textureLoader = new THREE.TextureLoader();
const fieldTexture = textureLoader.load("./ground.jpg");

const bgTexture = textureLoader.load([
  "./resources/posx.jpg",
  "./resources/negx.jpg",
  "./resources/posy.jpg",
  "./resources/negy.jpg",
  "./resources/posz.jpg",
  "./resources/negz.jpg",
]);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

scene.map = bgTexture;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 500, 300);
scene.add(directionalLight);

//adding field

const fieldGeometry = new THREE.PlaneGeometry(50, 50);
const fieldMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color("grey"),
  side: THREE.DoubleSide,
});
const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
field.rotation.x = -Math.PI / 2;
field.position.y = -0.01;
// fieldMaterial.map = fieldTexture;
scene.add(field);

// DEBUG PANEL FOR FIELD

// let fieldFolder = gui.addFolder("field");
// fieldFolder.add(field.position, "x").min(-15).max(15).step(0.01);
// fieldFolder.add(field.position, "y").min(-15).max(15).step(0.01);
// fieldFolder.add(field.position, "z").min(-15).max(15).step(0.01);

// scene.add(fieldFolder)

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
scene.add(camera);

camera.position.x = 4;
camera.position.y = 7;

camera.position.z = 23;
//making shapes

let colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange",
  "pink",
  "cyan",
  "grey",
];

gui.add(camera.position, "x");
gui.add(camera.position, "y");
gui.add(camera.position, "z");

// making towers

let makeCube = (typeBasedArray) => {
  let z = 1 / 2;
  let x = 1 / 2;

  for (let i = 0; i < typeBasedArray.length; i++) {
    let currentObject = typeBasedArray[i];
    for (let j = 0; j < currentObject.values.length; j++) {
      const Cgeometry = new THREE.BoxGeometry(
        0.5,
        currentObject.values[j].height,
        0.5
      );
      const Cmaterial = new THREE.MeshStandardMaterial({ color: colors[i] });
      const cube = new THREE.Mesh(Cgeometry, Cmaterial);
      cube.position.x = x;

      cube.position.y = currentObject.values[j].height / 2;
      cube.position.z = z;
      //   console.log(currentObject);

      scene.add(cube);
      x++;
    }
    x = 1 / 2;
    z++;
  }
};

makeCube(typeBasedArray);

//================================
// -10, 10, 5

let z = 23;
let x = 4;
let y = 10;
document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "38") {
    // up arrow
    z = z - 0.1;
    camera.position.z = z;
  } else if (e.keyCode == "40") {
    // down arrow
    z = z + 0.1;
    camera.position.z = z;
  } else if (e.keyCode == "37") {
    // left arrow
    x = x - 0.1;
    camera.position.x = x;
  } else if (e.keyCode == "39") {
    // right arrow
    x = x + 0.1;
    camera.position.x = x;
  }
}

document.addEventListener("keydown", (e) => {
  //   mouseX = e.clientX;
  //   console.log(mouseX);
  checkKey(e);
});

let mouseX = 0;
let mouseY = 0;

let mouseMovement = (e) => {
  mouseX = ((e.clientX - 0) / 1350) * 2 - 1;
  mouseY = ((e.clientY - 0) / 620) * 2 - 1;
  // console.log(mouseX, mouseY);
};

document.addEventListener("mousemove", mouseMovement);

//==========================================

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// const controls = new OrbitControls(camera, renderer.domElement);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  camera.rotation.x = mouseX;
  camera.rotation.y = -mouseY;

  // controls.update();
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
