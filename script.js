import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import typeBasedArray from './cleanData.js';

const gui = new dat.GUI();

// console.log(typeBasedArray)

// typeBasedArray.forEach((object)=>{
//     console.log(object)
// })

// const fieldTexture = new THREE.TextureLoader()
// fieldTexture.load(  );

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 500, 300);
scene.add(directionalLight);


//adding field

const fieldGeometry = new THREE.PlaneGeometry(50, 50);
const fieldMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color('grey'), side: THREE.DoubleSide });
const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
field.rotation.x = -Math.PI/2;
field.position.y = -0.01
scene.add(field);

// field.rotation.x = 2
// field.rotation.y = 2

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

camera.position.x = -10;
camera.position.y = 10;

camera.position.z = 5;
//making shapes 

let colors = ['red', 'green', 'blue', 'yellow','purple', 'orange', 'pink', 'cyan', 'grey']
let makeCube = (typeBasedArray) => {

    let z = 1 / 2;
    let x = 1 / 2;
    
    for (let i = 0; i < typeBasedArray.length; i++) {
        let currentObject = typeBasedArray[i];
        for (let j = 0; j < currentObject.values.length; j++) {
            const Cgeometry = new THREE.BoxGeometry(0.5, currentObject.values[j].height, 0.5);
            const Cmaterial = new THREE.MeshStandardMaterial({ color: colors[i] });
            const cube = new THREE.Mesh(Cgeometry, Cmaterial);
            cube.position.x = x
            
            cube.position.y = currentObject.values[j].height/2;
            cube.position.z = z
            console.log(currentObject)
            
            scene.add(cube);
            x++
        }
        x = 1/2;
        z++
    }
}

makeCube(typeBasedArray)
setTimeout(() => {

}, 1000)



const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

const controls = new OrbitControls(camera, renderer.domElement);

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    controls.update()
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();



