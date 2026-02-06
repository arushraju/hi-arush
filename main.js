import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.149.0/examples/jsm/loaders/RGBELoader.js';

//Loading Page
const loadingManager = new THREE.LoadingManager();

//At the start of loading the page
loadingManager.onStart = function(url,item,total){
  console.log('Loading has Started');
}
//When the loading is going on
loadingManager.onProgress = function(url,item,total){
  console.log(`Loading ${url} | item = ${item} | total=  ${total}`);
  //Here I will animate the loading bar
  const progress = item/total;
  console.log(progress);
  animateLoading(progress);
}

//This function will take in the number from 0 to 1 and will animate the loading
const earth = document.querySelector('.earth');
const loader = document.querySelector('.loading-background');
let finished = false;

function animateLoading(progress) {
  const angle = 360 * progress;

  earth.style.transform =
    `translate(50%, -50%) rotate(${angle}deg)`;

  if (progress === 1 && !finished) {
    finished = true;

    earth.addEventListener(
      "transitionend",
      () => {
        // Fade out loader over 2 seconds, then hide it & show start button
        gsap.to(loader, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            loader.style.display = "none";
            arush_start_button.style.display = "block";
          }
        });
      },
      { once: true }
    );
  }
}


//When the loading process is finished
loadingManager.onLoad = function(url,item,total){
  console.log('Finished loading');
  
}
//When loading error
loadingManager.onError = function(url){
  console.log(`Erro loading ${url}`);
}

//On CLicking the Two Dimension Button the Camera would move inside the snowman with phone, and will trun itself into 2D website
const two_D_button = document.querySelector('.two_D-button');

//Clicking 2D button
two_D_button.addEventListener('click',()=>{

  //Disbale Controls
  controls.enabled = false;
  controls.minDistance = 0;
  controls.maxDistance = 15;

  //Get the Cordinates of the phone in the hands of snowman
  const phone_cordinates = new THREE.Vector3();
  const starting_cordinates = new THREE.Vector3();

  const phone_object = scene.getObjectByName('Phone');
  const starting_object = scene.getObjectByName('Starting_Position');

  if(phone_object && starting_cordinates){
    phone_object.getWorldPosition(phone_cordinates);
    starting_object.getWorldPosition(starting_cordinates);
  } else {
    console.log('No Such object found');
  }
  
  
  console.log('Phone cordinates : '); console.log(phone_cordinates);
  console.log('Starting Position : '); console.log(starting_cordinates);

  allowRotate = false;
  gsap.to(
    //Position will be set to starting position
    camera.position,
    {
      x : starting_cordinates.x,
      y : starting_cordinates.y,
      z : starting_cordinates.z,
      duration : 2,
    }
  )
  //Target will be set to the phone
  gsap.to(
    controls.target,
    {
      x : phone_cordinates.x,
      y : phone_cordinates.y,
      z : phone_cordinates.z,
      duration : 2,
      onComplete : ()=>{
        gsap.to(
          camera.position,
          {
            x : phone_cordinates.x,
            y : phone_cordinates.y,
            z : phone_cordinates.z,
            duration : 2,
            onComplete : ()=>{
              //Display the 2D website and make everythign disappear
              document.querySelector('.rotation-button').style.display = 'none';
              document.querySelector('.two_D-button').style.display = 'none';
              pop_up_container.style.display = 'block';
              modal_title.textContent = "2D Website";
              modal_content.innerHTML = "<p>Click on the link below to experience the 2D Website.</p>";
              modal_link.href = "./Arush101/index.html";
            }
          }
        )
      }
    }
  )
})


//This varibale will start or stop the rotation
let allowRotate;


//Start Button click
const arush_start_button = document.querySelector('.start-image');
const click_here = document.querySelector('.clickhere');
const start_button = document.querySelector('.start-button');


const black_Background = document.querySelector('.start-button-container');
const rotation_button = document.querySelector('.rotation-button');

//Rotation button is clicked
let rotationClickedAgain = true;
let pop_up_rotation = true;
rotation_button.addEventListener('click',onRotationClick);
function onRotationClick(e){
  //console.log('rotationClickedAgain = ' + rotationClickedAgain);
  if(rotationClickedAgain){
    allowRotate = false;
    pop_up_rotation = allowRotate;
    rotationClickedAgain = false;
  } else {
    allowRotate = true;
    pop_up_rotation = allowRotate;
    rotationClickedAgain = true;
  }

}

rotation_button.addEventListener('mouseenter',()=>{
  rotation_button.style.backgroundColor = 'rgb(124, 120, 255)';
  
});
rotation_button.addEventListener('mouseleave',()=>{
  rotation_button.style.backgroundColor = 'rgb(255, 255, 0)';
  
});


black_Background.style.backgroundColor = 'black';

//Event listerner for clicking the start button
arush_start_button.addEventListener('click',onStartClick);
function onStartClick(event){
  black_Background.style.display = 'none';
  canvas.style.display = 'block';
}
//Event listner to change the color of the button on starting
arush_start_button.addEventListener('mouseenter',()=>{
  start_button.style.backgroundColor = 'rgba(153, 255, 0, 1)';
})
arush_start_button.addEventListener('mouseleave',()=>{
  start_button.style.backgroundColor = 'rgba(0, 29, 109, 1)';
})


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);

const canvas = document.getElementById('canvas');


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/******************************   Camera and logo animation *************************** */

const logo = document.querySelectorAll('.logo');

logo.forEach(c => {
  c.addEventListener('mouseenter', () => {
    c.style.transform = 'scale(1.5)';
    c.style.transitionDuration = '0.4s';
  });

  c.addEventListener('mouseleave', () => {
    c.style.transform = 'scale(1)';
    c.style.transitionDuration = '0.4s';
  });
});


const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.001,
  1000
);
camera.position.set(0,5,0);

function animateCamera() {
  gsap.to(camera.position, {
    x: 0,
    y: 2.15,
    z: -15,
    duration: 1,
    ease: "power2.out"
  });

  gsap.to(camera.position, {
    x: 0,
    y: 1.396,
    z: -9.776,
    duration: 0.5,
    ease: "power1.in",
    delay: 1
  });

  gsap.to(controls.target, {
    x: 0,
    y: 0,
    z: 0,
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: () => controls.update()
  });

  //For logo Animation
  gsap.fromTo(logo, {
    opacity: 0,
    scale: 0
  }, {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: "elastic.out(1, 0.5)",
    stagger: 0.15
  });

  //For Arush_Start_Button_Animation
  gsap.fromTo(arush_start_button, {
    opacity: 1,
    scale: 1
  }, {
    opacity: 0,
    scale: 3,
    duration: 0.5,
    onComplete :()=>{
      // Remove the listener immediately
      window.removeEventListener('click', animateCamera);
      arush_start_button.style.zIndex = '-1';
      arush_start_button.style.display = 'none';
      document.querySelector('.arush-start-button').style.display = 'none';
      document.querySelector('.arush-start-button-container').style.display = 'none';
    }
  });

  
  //start rotatign the globe
  allowRotate =  true;
}

// Add listener once
arush_start_button.addEventListener('click', animateCamera);


/************************************    RENDERS ************************* */
const renderer = new THREE.WebGLRenderer({ 
  canvas : canvas,
  antialias: true 
});
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

/****************************   Controls ***************8 */
const controls = new OrbitControls(camera, renderer.domElement);

/****************************          Lights            ************** */


// Ambient light (soft fill)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // soft white light
scene.add(ambientLight);

//Hemisphere Light
const sun_light = new THREE.HemisphereLight( 0xffffbb, 0x481278, 1 );
sun_light.position.set(-15.274,1.123,-16.39);
scene.add( sun_light );


// Array of image paths
const skyboxImages = [
  './The_Globe_Media/px.png',
  './The_Globe_Media/nx.png',
  './The_Globe_Media/py.png',
  './The_Globe_Media/ny.png',
  './The_Globe_Media/pz.png',
  './The_Globe_Media/nz.png'
];

const skyloader = new THREE.CubeTextureLoader(loadingManager);
const skyboxTexture = skyloader.load(skyboxImages);

// Set as scene background
scene.background = skyboxTexture;

/*******************************LOGO ANIMATION */


/***************************       Ray Casting ************************* */
const clickable_Object = [
  'Cube008',
  'Cube008_1',
  'Propellor_1',
  'Propellor_2',
  'Three',
  "Three_1",
  "Cylinder033",
  "Cylinder033_1",
  "Cylinder034",
  "Cylinder034_1",
  "Cylinder035",
  "Cylinder035_1",
  "Cylinder036",
  "Cylinder036_1",
  "Cylinder037",
  "Cylinder037_1",
  'Cube015',
  'Cube015_1',
  'Chess_Hobbies',
  'Books_Hobbies',
  'Animation_Hobbies',
  'About_me_1',
  'About_me_2',
  'About_me_3',
  'TicTacToe_Project_1',
  'TicTacToe_Project_2',
  'TicTacToe_Project_3',
  'TicTacToe_Project_4',
  'TicTacToe_Project_5',
  'Speed_Cubing_Hobbies',
  'Cube019',
  'Cube019_1',
  'Cube019_2',
  'Cube019_3',
  'Cube019_4',
  'Cube019_5',
  'RubiksCubeWebsite_2',
  'Notes',
  'Movies_Hobbies',
  'Cube005',
  'Cube005_1',
  'Cube005_2',
  'Cube024',
  'Cube024_1',
  'Cube024_2',
  'Cube025',
  'Cube025_1',
  'Cube059',
  'Cube059_1',
  'Cube059_2',
  'Cube035',
  'Cube035_1',
  'PINN_1',
  'PINN_2',
  'PINN_3',
  'PINN_4',
  'PINN_5',
  'PINN_6',
  'PINN_7',
  'PINN_8',
  'PINN_9',
  'PINN_10',
  'Plane004',
  'Plane004_1',
  'Plane004_2',
];

let popupOpen = false;

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

window.addEventListener('mousedown', onMouseClick, false);

function onMouseClick(event) {
  // Calculate mouse position in normalized device coordinates (NDC)
  // (-1 to +1) for both axes
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // 3. Update the raycaster with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // 4. Calculate intersections
  // 'scene.children' is the list of objects to check
  // 'true' means it checks all descendants of the objects recursively
  const intersects = raycaster.intersectObjects(scene.children, true);

  // 5. Check if any objects were intersected
  if (intersects.length > 0 && !popupOpen) {
  const obj = intersects[0].object;
    if(clickable_Object.includes(obj.name)){

      const color = obj.material.color.getHex();;

      // Reset color (optional)
      if (obj.material) {
        //obj.material.color.setHex(0xff0000);
      }

      //Now we will show the modal
      showModal(obj.name);
      console.log(obj.name);
      popupOpen = true;

      // // Bounce scale
      // gsap.fromTo(
      //   obj.scale,
      //   { x: 1, y: 1, z: 1 },
      //   {
      //     x: 2,
      //     y: 2,
      //     z: 2,
      //     duration: 0.1,
      //     ease: "back.out(0.5)",
      //     yoyo: true,
      //     repeat: 1,
      //     onComplete: () => {
      //       if (obj.material) {
      //         obj.material.color.setHex(color); // reset AFTER bounce
      //         
      //       }
      //     }
      //   }
      // );
      
    }
  } 
}

/****************************************************** POP UP */
const pop_up_container = document.querySelector('.pop-up-position');


const modalContent = {
  //Aircraft project
  'Cube008' : {
    title : 'AE643 Project',
    content: '<p>This is a group project from an Aeromodelling course in which we were tasked with designing an aircraft; we developed a twin-fuselage design, and a downloadable report corresponding to this project is provided below.</p>',
    link : './The_Globe_Media/AE463_Report.pdf',
    Image : './The_Globe_Media/AE463_Pop_up_Image.jpg'
  },
  'Cube008_1' : {
    title : 'AE643 Project',
    content: '<p>This is a group project from an Aeromodelling course in which we were tasked with designing an aircraft; we developed a twin-fuselage design, and a downloadable report corresponding to this project is provided below.</p>',
    link : './The_Globe_Media/AE463_Report.pdf',
    Image : './The_Globe_Media/AE463_Pop_up_Image.jpg'
  },
  'Propellor_1' : {
    title : 'AE643 Project',
    content: '<p>This is a group project from an Aeromodelling course in which we were tasked with designing an aircraft; we developed a twin-fuselage design, and a downloadable report corresponding to this project is provided below.</p>',
    link : './The_Globe_Media/AE463_Report.pdf',
    Image : './The_Globe_Media/AE463_Pop_up_Image.jpg'
  },
  'Propellor_2' : {
    title : 'AE643 Project',
    content: '<p>This is a group project from an Aeromodelling course in which we were tasked with designing an aircraft; we developed a twin-fuselage design, and a downloadable report corresponding to this project is provided below.</p>',
    link : './The_Globe_Media/AE463_Report.pdf',
    Image : './The_Globe_Media/AE463_Pop_up_Image.jpg'
  },
  //Three js Project
  'Three' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Three_1' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Cylinder033' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Cylinder033_1' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Cylinder034' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Cylinder034_1' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Cylinder035' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Cylinder035_1' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Cylinder036' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Cylinder036_1' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Cylinder037' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Cylinder037_1' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects; due to its scale, the website does not support touchscreen devices, and for the best experience, I recommend using a desktop or laptop with dedicated graphics support.</p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">here</a>.</p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },

  //Crowd Dynamics Projects
  'Cube015' : {
    title: "Crowd Dynamics",
    content: "<p>This is my first undergraduate project, an attempt to simulate Hughes’ pedestrian flow using the <b>Finite Difference Method</b> in <b>MATLAB</b>; the project is still ongoing, and the GitHub page explaining it is provided below.</p>",
    link: 'https://arushraju.github.io/Crowd-Dynamics/',
    Image:"./The_Globe_Media/CrowdDynamics.jpg"
  },
  'Cube015_1' : {
    title: "Crowd Dynamics",
    content: "<p>This is my first undergraduate project, an attempt to simulate Hughes’ pedestrian flow using the <b>Finite Difference Method</b> in <b>MATLAB</b>; the project is still ongoing, and the GitHub page explaining it is provided below.</p>",
    link: 'https://arushraju.github.io/Crowd-Dynamics/',
    Image:"./The_Globe_Media/CrowdDynamics.jpg"
  },
  //Rubiks cube project
  'Cube019':{
    title:"NNN Rubiks Cube Solver",
    content : "<p>This is my first full-stack project, where I developed the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Rubik’s Cube solver website; the algorithm can solve Rubik’s cubes of any dimension (not limited to 3×3), and the website is not yet responsive due to the need to display higher-dimensional cubes, with the link to the website provided below.</p>",
    link:"https://not-necessarily-normal-rubiks-cube-solver.onrender.com/",
    Image:"./The_Globe_Media/NNNSolver.png"
  },
  'Cube019_1':{
    title:"NNN Rubiks Cube Solver",
    content : "<p>This is my first full-stack project, where I developed the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Rubik’s Cube solver website; the algorithm can solve Rubik’s cubes of any dimension (not limited to 3×3), and the website is not yet responsive due to the need to display higher-dimensional cubes, with the link to the website provided below.</p>",
    link:"https://not-necessarily-normal-rubiks-cube-solver.onrender.com/",
    Image:"./The_Globe_Media/NNNSolver.png"
  },
  'Cube019_2':{
    title:"NNN Rubiks Cube Solver",
    content : "<p>This is my first full-stack project, where I developed the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Rubik’s Cube solver website; the algorithm can solve Rubik’s cubes of any dimension (not limited to 3×3), and the website is not yet responsive due to the need to display higher-dimensional cubes, with the link to the website provided below.</p>",
    link:"https://not-necessarily-normal-rubiks-cube-solver.onrender.com/",
    Image:"./The_Globe_Media/NNNSolver.png"
  },
  'Cube019_3':{
    title:"NNN Rubiks Cube Solver",
    content : "<p>This is my first full-stack project, where I developed the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Rubik’s Cube solver website; the algorithm can solve Rubik’s cubes of any dimension (not limited to 3×3), and the website is not yet responsive due to the need to display higher-dimensional cubes, with the link to the website provided below.</p>",
    link:"https://not-necessarily-normal-rubiks-cube-solver.onrender.com/",
    Image:"./The_Globe_Media/NNNSolver.png"
  },
  'Cube019_4':{
    title:"NNN Rubiks Cube Solver",
    content : "<p>This is my first full-stack project, where I developed the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Rubik’s Cube solver website; the algorithm can solve Rubik’s cubes of any dimension (not limited to 3×3), and the website is not yet responsive due to the need to display higher-dimensional cubes, with the link to the website provided below.</p>",
    link:"https://not-necessarily-normal-rubiks-cube-solver.onrender.com/",
    Image:"./The_Globe_Media/NNNSolver.png"
  },
  'Cube019_5':{
    title:"NNN Rubiks Cube Solver",
    content : "<p>This is my first full-stack project, where I developed the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Rubik’s Cube solver website; the algorithm can solve Rubik’s cubes of any dimension (not limited to 3×3), and the website is not yet responsive due to the need to display higher-dimensional cubes, with the link to the website provided below.</p>",
    link:"https://not-necessarily-normal-rubiks-cube-solver.onrender.com/",
    Image:"./The_Globe_Media/NNNSolver.png"
  },
  'RubiksCubeWebsite_2':{
    title:"NNN Rubiks Cube Solver",
    content : "<p>This is my first full-stack project, where I developed the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Rubik’s Cube solver website; the algorithm can solve Rubik’s cubes of any dimension (not limited to 3×3), and the website is not yet responsive due to the need to display higher-dimensional cubes, with the link to the website provided below.</p>",
    link:"https://not-necessarily-normal-rubiks-cube-solver.onrender.com/",
    Image:"./The_Globe_Media/NNNSolver.png"
  },
  //Prism's Gambit
  'Cube005':{
    title:"Prism's Gambit",
    content : "<p>This is my second full-stack project, where I built the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Laser Chess website; the engine depth can practically go up to 5, and the link to the website is provided below.</p>",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  'Cube005_1':{
    title:"Prism's Gambit",
    content : "<p>This is my second full-stack project, where I built the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Laser Chess website; the engine depth can practically go up to 5, and the link to the website is provided below.</p>",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  'Cube005_2':{
    title:"Prism's Gambit",
    content : "<p>This is my second full-stack project, where I built the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Laser Chess website; the engine depth can practically go up to 5, and the link to the website is provided below.</p>",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  'Cube024':{
    title:"Prism's Gambit",
    content : "<p>This is my second full-stack project, where I built the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Laser Chess website; the engine depth can practically go up to 5, and the link to the website is provided below.</p>",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  'Cube024_1':{
    title:"Prism's Gambit",
    content : "<p>This is my second full-stack project, where I built the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Laser Chess website; the engine depth can practically go up to 5, and the link to the website is provided below.</p>",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  'Cube024_2':{
    title:"Prism's Gambit",
    content : "<p>This is my second full-stack project, where I built the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Laser Chess website; the engine depth can practically go up to 5, and the link to the website is provided below.</p>",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  'Cube025':{
    title:"Prism's Gambit",
    content : "<p>This is my second full-stack project, where I built the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Laser Chess website; the engine depth can practically go up to 5, and the link to the website is provided below.</p>",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  'Cube025_1':{
    title:"Prism's Gambit",
    content : "<p>This is my second full-stack project, where I built the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Laser Chess website; the engine depth can practically go up to 5, and the link to the website is provided below.</p>",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  'Cube059':{
    title:"Prism's Gambit",
    content : "<p>This is my second full-stack project, where I built the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Laser Chess website; the engine depth can practically go up to 5, and the link to the website is provided below.</p>",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  'Cube059_1':{
    title:"Prism's Gambit",
    content : "<p>This is my second full-stack project, where I built the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Laser Chess website; the engine depth can practically go up to 5, and the link to the website is provided below.</p>",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  'Cube059_2':{
    title:"Prism's Gambit",
    content : "<p>This is my second full-stack project, where I built the core algorithm in <b>C++</b>, designed the frontend using <b>JavaScript</b>, implemented the backend with <b>Node.js</b>, and deployed a fully functional Laser Chess website; the engine depth can practically go up to 5, and the link to the website is provided below.</p>",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  //Tic Tac Toe Project
  'TicTacToe_Project_1':{
    title:"Tic Tac Toe with Feynman",
    content : "<p>This project implements a Tic-Tac-Toe solver using <b>Qiskit</b>, a quantum programming library in Python, applying <b>Grover’s algorithm</b> to identify the optimal move for a given board state; while the problem is computationally trivial and quantum methods are not more efficient than classical ones, the project serves as an exploration of applying quantum algorithms to game logic, and the GitHub link is provided below.</p>",
    link: 'https://arushraju.github.io/Tic-Tac-Toe-with-Feynman/',
    Image : './The_Globe_Media/QC_TicTacToe_Wallpaper.jpeg'
  },
  'TicTacToe_Project_2':{
    title:"Tic Tac Toe with Feynman",
    content : "<p>This project implements a Tic-Tac-Toe solver using <b>Qiskit</b>, a quantum programming library in Python, applying <b>Grover’s algorithm</b> to identify the optimal move for a given board state; while the problem is computationally trivial and quantum methods are not more efficient than classical ones, the project serves as an exploration of applying quantum algorithms to game logic, and the GitHub link is provided below.</p>",
    link: 'https://arushraju.github.io/Tic-Tac-Toe-with-Feynman/',
    Image : './The_Globe_Media/QC_TicTacToe_Wallpaper.jpeg'
  },
  'TicTacToe_Project_3':{
    title:"Tic Tac Toe with Feynman",
    content : "<p>This project implements a Tic-Tac-Toe solver using <b>Qiskit</b>, a quantum programming library in Python, applying <b>Grover’s algorithm</b> to identify the optimal move for a given board state; while the problem is computationally trivial and quantum methods are not more efficient than classical ones, the project serves as an exploration of applying quantum algorithms to game logic, and the GitHub link is provided below.</p>",
    link: 'https://arushraju.github.io/Tic-Tac-Toe-with-Feynman/',
    Image : './The_Globe_Media/QC_TicTacToe_Wallpaper.jpeg'
  },
  'TicTacToe_Project_4':{
    title:"Tic Tac Toe with Feynman",
    content : "<p>This project implements a Tic-Tac-Toe solver using <b>Qiskit</b>, a quantum programming library in Python, applying <b>Grover’s algorithm</b> to identify the optimal move for a given board state; while the problem is computationally trivial and quantum methods are not more efficient than classical ones, the project serves as an exploration of applying quantum algorithms to game logic, and the GitHub link is provided below.</p>",
    link: 'https://arushraju.github.io/Tic-Tac-Toe-with-Feynman/',
    Image : './The_Globe_Media/QC_TicTacToe_Wallpaper.jpeg'
  },
  'TicTacToe_Project_5':{
    title:"Tic Tac Toe with Feynman",
    content : "<p>This project implements a Tic-Tac-Toe solver using <b>Qiskit</b>, a quantum programming library in Python, applying <b>Grover’s algorithm</b> to identify the optimal move for a given board state; while the problem is computationally trivial and quantum methods are not more efficient than classical ones, the project serves as an exploration of applying quantum algorithms to game logic, and the GitHub link is provided below.</p>",
    link: 'https://arushraju.github.io/Tic-Tac-Toe-with-Feynman/',
    Image : './The_Globe_Media/QC_TicTacToe_Wallpaper.jpeg'
  },
  //CloseFOAM
  'Cube035':{
    title:"CLoseFOAM",
    content:"<p>This project is an attempt to develop software for solving fluid simulation problems using the <b>Finite Difference Method</b>, specifically the <b>Marker-and-Cell (MAC) scheme</b>, implemented entirely in <b>C</b>, with a distinctive feature being the use of <b>OpenCV</b> to accept an image as input for defining the simulation domain instead of a traditional CAD model, and the GitHub page explaining the project is provided below.</p>",
    link:"https://arushraju.github.io/CloseFOAM/",
    Image:"./The_Globe_Media/CloseFOAM.png"
  },
  'Cube035_1':{
    title:"CLoseFOAM",
    content:"<p>This project is an attempt to develop software for solving fluid simulation problems using the <b>Finite Difference Method</b>, specifically the <b>Marker-and-Cell (MAC) scheme</b>, implemented entirely in <b>C</b>, with a distinctive feature being the use of <b>OpenCV</b> to accept an image as input for defining the simulation domain instead of a traditional CAD model, and the GitHub page explaining the project is provided below.</p>",
    link:"https://arushraju.github.io/CloseFOAM/",
    Image:"./The_Globe_Media/CloseFOAM.png"
  },
  //PINN
  'PINN_1':{
    title:"Gortler's Boundary Layer using PINN",
    content:"<p>Here I solved <b>Görtler’s transformation</b> using a <b>Physics-Informed Neural Network</b>, implemented in <b>Python</b> with <b>DeepXDE</b>, and the GitHub repository is linked below.</p>",
    link:"https://github.com/arushraju/AE646",
    Image:"./The_Globe_Media/PINN.png"
  },
  'PINN_2':{
    title:"Gortler's Boundary Layer using PINN",
    content:"<p>Here I solved <b>Görtler’s transformation</b> using a <b>Physics-Informed Neural Network</b>, implemented in <b>Python</b> with <b>DeepXDE</b>, and the GitHub repository is linked below.</p>",
    link:"https://github.com/arushraju/AE646",
    Image:"./The_Globe_Media/PINN.png"
  },
  'PINN_3':{
    title:"Gortler's Boundary Layer using PINN",
    content:"<p>Here I solved <b>Görtler’s transformation</b> using a <b>Physics-Informed Neural Network</b>, implemented in <b>Python</b> with <b>DeepXDE</b>, and the GitHub repository is linked below.</p>",
    link:"https://github.com/arushraju/AE646",
    Image:"./The_Globe_Media/PINN.png"
  },
  'PINN_4':{
    title:"Gortler's Boundary Layer using PINN",
    content:"<p>Here I solved <b>Görtler’s transformation</b> using a <b>Physics-Informed Neural Network</b>, implemented in <b>Python</b> with <b>DeepXDE</b>, and the GitHub repository is linked below.</p>",
    link:"https://github.com/arushraju/AE646",
    Image:"./The_Globe_Media/PINN.png"
  },
  'PINN_5':{
    title:"Gortler's Boundary Layer using PINN",
    content:"<p>Here I solved <b>Görtler’s transformation</b> using a <b>Physics-Informed Neural Network</b>, implemented in <b>Python</b> with <b>DeepXDE</b>, and the GitHub repository is linked below.</p>",
    link:"https://github.com/arushraju/AE646",
    Image:"./The_Globe_Media/PINN.png"
  },
  'PINN_6':{
    title:"Gortler's Boundary Layer using PINN",
    content:"<p>Here I solved <b>Görtler’s transformation</b> using a <b>Physics-Informed Neural Network</b>, implemented in <b>Python</b> with <b>DeepXDE</b>, and the GitHub repository is linked below.</p>",
    link:"https://github.com/arushraju/AE646",
    Image:"./The_Globe_Media/PINN.png"
  },
  'PINN_7':{
    title:"Gortler's Boundary Layer using PINN",
    content:"<p>Here I solved <b>Görtler’s transformation</b> using a <b>Physics-Informed Neural Network</b>, implemented in <b>Python</b> with <b>DeepXDE</b>, and the GitHub repository is linked below.</p>",
    link:"https://github.com/arushraju/AE646",
    Image:"./The_Globe_Media/PINN.png"
  },
  'PINN_8':{
    title:"Gortler's Boundary Layer using PINN",
    content:"<p>Here I solved <b>Görtler’s transformation</b> using a <b>Physics-Informed Neural Network</b>, implemented in <b>Python</b> with <b>DeepXDE</b>, and the GitHub repository is linked below.</p>",
    link:"https://github.com/arushraju/AE646",
    Image:"./The_Globe_Media/PINN.png"
  },
  'PINN_9':{
    title:"Gortler's Boundary Layer using PINN",
    content:"<p>Here I solved <b>Görtler’s transformation</b> using a <b>Physics-Informed Neural Network</b>, implemented in <b>Python</b> with <b>DeepXDE</b>, and the GitHub repository is linked below.</p>",
    link:"https://github.com/arushraju/AE646",
    Image:"./The_Globe_Media/PINN.png"
  },
  'PINN_10':{
    title:"Gortler's Boundary Layer using PINN",
    content:"<p>Here I solved <b>Görtler’s transformation</b> using a <b>Physics-Informed Neural Network</b>, implemented in <b>Python</b> with <b>DeepXDE</b>, and the GitHub repository is linked below.</p>",
    link:"https://github.com/arushraju/AE646",
    Image:"./The_Globe_Media/PINN.png"
  },

  'Notes':{
    title:'Study Notes',
    content:"<p>I have curated all my notes from the subjects I have learned and created a website where you can find them all; the link to the webpage is provided below. (The wbesite is not ready yet however)</p>",
    link:"",
    Image:""
  },
  //About me
  'About_me_1':{
    title:"Hey there!",
    content:"<p>Hi, I’m <b>Arush</b> — remember my name, because I show up in people’s dreams with a glass of water.</p><p> <b>Welcome</b> to my website, and <b>Thank you</b> for being here. I’m a final-year undergraduate interested in <b>Web Development</b>, <b>Aerospace</b>, and <b>Computational Engineering</b>, with a growing curiosity for <b>Quantum Computing</b> and <b>Game Development</b>. More than anything, I’m just a boy learning his way through life. Here, you’ll find my projects, skills, and hobbies — explore the page, interact with objects, and discover relevant links along the way.</p><p><b>Enjoy exploring.</b></p>",
    link:"",
    Image:""
  },
  'About_me_2':{
    title:"Hey there!",
    content:"<p>Hi, I’m <b>Arush</b> — remember my name, because I show up in people’s dreams with a glass of water.</p><p> <b>Welcome</b> to my website, and <b>Thank you</b> for being here. I’m a final-year undergraduate interested in <b>Web Development</b>, <b>Aerospace</b>, and <b>Computational Engineering</b>, with a growing curiosity for <b>Quantum Computing</b> and <b>Game Development</b>. More than anything, I’m just a boy learning his way through life. Here, you’ll find my projects, skills, and hobbies — explore the page, interact with objects, and discover relevant links along the way.</p><p><b>Enjoy exploring.</b></p>",
    link:"",
    Image:""
  },
  'About_me_3':{
    title:"Hey there!",
    content:"<p>Hi, I’m <b>Arush</b> — remember my name, because I show up in people’s dreams with a glass of water.</p><p> <b>Welcome</b> to my website, and <b>Thank you</b> for being here. I’m a final-year undergraduate interested in <b>Web Development</b>, <b>Aerospace</b>, and <b>Computational Engineering</b>, with a growing curiosity for <b>Quantum Computing</b> and <b>Game Development</b>. More than anything, I’m just a boy learning his way through life. Here, you’ll find my projects, skills, and hobbies — explore the page, interact with objects, and discover relevant links along the way.</p><p><b>Enjoy exploring.</b></p>",
    link:"",
    Image:""
  },
  'Speed_Cubing_Hobbies':{
    title:"Speed Cubing!",
    content:"Rubiks Cube is an integral part of my body.",
    link:"",
    Image:""
  },
  'Books_Hobbies':{
    title:"Books!",
    content:"<p>I like reading books and some of my recommendations are <br><ul><li>The courage to be Disliked</li><li>Atomic Habits</li><li>The subtle art of not giving a F*ck</li><li>Ikigai</li><li>The Pyscology of Money</li></ul></p>"
  },
  'Chess_Hobbies':{
    title:"Chess!",
    content:"like playing <b>chess</b>, and below is my <u>chess.com profile</u>. Feel free to join me, and we can learn and enjoy the game together. I’ve often thought about <u>why I like this game</u> so much and have struggled to find a completely satisfactory answer. If you’d like to share your thoughts, you can help me by <u>emailing me</u> what you think makes chess so addictive.",
    link:"https://www.chess.com/member/arushification",
    Image:""
  },
  'Animation_Hobbies':{
    title:"Animation",
    content:"<p>I also enjoy creating animations, and animation is what originally led me to learn <b>Blender</b>. It has been around <u>three years</u> since I started learning Blender, and all of my previous Blender projects are available in a <u>GitHub repository</u>, the link to which is provided below.</p><p>Driven by my curiosity about <u>game development</u>, I also have some experience in <b>Unity game engine</b>.</p>",
    link:"",
    Image:""
  },
  'Movies_Hobbies':{
    title:"Movies!",
    content:"One of my hobbies is watching movies, and I created this website to showcase a collection of films that I personally enjoyed. The website is designed as a fun and immersive experience, and it includes <u>background music</u> while browsing. Please note that the website is <u>not responsive yet</u> and <u>may not function properly on mobile phones</u> for now.",
    link:"https://arushraju.github.io/Arushs-Movies/",
    Image:"./The_Globe_Media/Movies_Colllage.webp"
  },
  //Red Shelf
  'Plane004' : {
    title: "Red Shelf",
    content: "<p>This project is a <u>3D Library Catalog</u> that helps users quickly find the correct bookshelf by entering a <u>Book ID</u>. The entire library model is created in <b>Blender</b>, while the interactive web graphics are built using <b>Three.js</b>. What makes this project special is that it is my <u>first Three.js project that also includes a backend</u>. The website uses the <u>college’s official API</u> to fetch book data and is designed to be <u>integrated directly into the college’s website</u>.</p><p>The link to the website is provided below.</p>",
    link : "https://red-shelf.vercel.app/",
    Image : "Image of Red Shelf"
  },
  'Plane004_1' : {
    title: "Red Shelf",
    content: "<p>This project is a <u>3D Library Catalog</u> that helps users quickly find the correct bookshelf by entering a <u>Book ID</u>. The entire library model is created in <b>Blender</b>, while the interactive web graphics are built using <b>Three.js</b>. What makes this project special is that it is my <u>first Three.js project that also includes a backend</u>. The website uses the <u>college’s official API</u> to fetch book data and is designed to be <u>integrated directly into the college’s website</u>.</p><p>The link to the website is provided below.</p>",
    link : "https://red-shelf.vercel.app/",
    Image : "Image of Red Shelf"
  },
  'Plane004_2' : {
    title: "Red Shelf",
    content: "<p>This project is a <u>3D Library Catalog</u> that helps users quickly find the correct bookshelf by entering a <u>Book ID</u>. The entire library model is created in <b>Blender</b>, while the interactive web graphics are built using <b>Three.js</b>. What makes this project special is that it is my <u>first Three.js project that also includes a backend</u>. The website uses the <u>college’s official API</u> to fetch book data and is designed to be <u>integrated directly into the college’s website</u>.</p><p>The link to the website is provided below.</p>",
    link : "https://red-shelf.vercel.app/",
    Image : "Image of Red Shelf"
  }
}

const modal_title = document.querySelector('.heading');
const modal_image = document.querySelector('.the-image');
const modal_content = document.querySelector('.content');
const modal_link = document.querySelector('.the-link');


function showModal(id){
  if(pop_up_rotation)allowRotate = !allowRotate;
  
  pop_up_container.style.display = 'block';
  const content = modalContent[id];
  if(content){
    modal_title.textContent = content.title;
    modal_content.innerHTML = content.content;
    //Image

    //Links
    modal_image.src = content.Image;
    if(
      id ==  'Speed_Cubing_Hobbies' ||
      id ==  'Books_Hobbies' ||
      id == 'About_me_1'||
      id == 'About_me_2'||
      id == 'About_me_3'
    ){
      modal_link.style.display = 'none';
    }else{
      modal_link.style.display = 'block';
      modal_link.href = content.link;
    }
    
  }
}

const exit_button = document.querySelector('.exit-button');
exit_button.addEventListener('click',()=>{
  pop_up_container.style.display = 'none';
  if(pop_up_rotation){allowRotate = !allowRotate;}
  popupOpen = false;
  //Also play the animation

})

/***************************     Loading the GLB File     ************************* */
let model; // store reference
let mixer; //Animation



const gltfLoader  = new GLTFLoader(loadingManager);

gltfLoader.load(
  './mesh.glb',
  (gltf) => {
    gltf.scene.traverse((child)=>{
      //console.log(child);
    })
    model = gltf.scene;
    scene.add(model);

    //Load the animation
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    if (clips.length > 0) {

      // const clip = THREE.AnimationClip.findByName(clips, 'Crowd_Dynamics') || clips[0];
      // const action = mixer.clipAction(clip);
      // action.play();

      clips.forEach((clip)=>{
        let action = mixer.clipAction(clip);
        action.play();
      })
    }
  },
  undefined,
  (error) => {
    console.error('GLB load error:', error);
  }
);


//To control the zoom
controls.enableZoom = true;
controls.minDistance = 5;
controls.maxDistance = 15;
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false; 


/***************************    Animate the frames    ************************** */
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta)
  

  //console.log('allowRotate = ' + allowRotate);

  if (model && allowRotate) {
    model.rotation.y += 0.002;
  }

  //console.log(camera.position);
  
  controls.update()
  
  renderer.render(scene, camera);
}


animate();
