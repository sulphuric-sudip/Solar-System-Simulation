const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeDisplay = document.getElementById("timeDisplay");

let centerSunX = canvas.width / 2;
let centerSunY = canvas.height / 2;

const planets = [
    { name: "Sun", radius: 130.00},
    { name: "Mercury", radius: 15.44, days: 87.97, axis: 100.0, eccentricity: 0.206, parentIndex: 0},
    { name: "Venus", radius: 27.05, days: 224.7, axis: 195.0, eccentricity: 0.007, parentIndex: 0},
    { name: "Earth", radius: 30.37, days: 365.26, axis: 290.0, eccentricity: 0.017, parentIndex: 0},
    { name: "Mars", radius: 20.39, days: 687.0, axis: 440.0, eccentricity: 0.093, parentIndex: 0},
    { name: "Jupiter", radius: 130.01, days: 4333.0, axis: 700.0, eccentricity: 0.048, parentIndex: 0},
    { name: "Saturn", radius: 110.22, days: 10759, axis: 925.0, eccentricity: 0.056, parentIndex: 0},
    { name: "Uranus", radius: 65.36, days: 30687, axis: 1150.0, eccentricity: 0.046, parentIndex: 0},
    { name: "Neptune", radius: 74.63, days: 60190, axis: 1400.0, eccentricity: 0.010, parentIndex: 0},
    {name: "Moon", radius: 8.7, days: 27.3, axis: 45.0, eccentricity: 0.0549, parentIndex: 3}
];
const image = [];
for(let i = 0; i< planets.length; i++){
    image[i] = new Image();
    image[i].src = "images/"+ planets[i].name + ".png"
}

let scale = 0.45;
let speed = 0.065;
let time = 0;
let play = false;
let topView = false;

let centerX = [];
let centerY = [];

function drawSolarSystem(){

    centerX[0] = (planets[8].axis + planets[8].radius * 2) * scale;
    centerY[0] = (planets[8].axis + planets[8].radius * 2) * scale;
    if(topView == false){
        centerY[0] = (planets[8].axis * 0.5 + planets[8].radius * 2) * scale;
    }
    canvas.width = 2 * centerX[0];
    canvas.height = 2 * centerY[0];
    
    ctx.clearRect(0, 0, 2 * centerY[0], 2 * centerX[0]);

    //draw sun
    ctx.globalAlpha = 0.8;
    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, Height);
    ctx.drawImage(image[0], 0, 0, image[0].width, image[0].height, centerX[0] - planets[0].radius * scale, centerY[0] - planets[0].radius * scale, 2 * planets[0].radius * scale, 2 * planets[0].radius * scale);

    for (let i = 1; i< planets.length; i++){
        let planet = planets[i];
        //update all parameters
        const majoraxis = planet.axis * scale;
        let minoraxis;
        // b = a * sprt(1 - e^2)
        if(topView == true){
            minoraxis = majoraxis * Math.sqrt(1 - planet.eccentricity * planet.eccentricity);
        }
        else{
            minoraxis = majoraxis * 0.5;
        }
        const j = planet.parentIndex;
        //draw orbit
        ctx.beginPath();
        ctx.setLineDash([1, 2]);
        ctx.globalAlpha = 0.4;
        ctx.ellipse(centerX[j], centerY[j], majoraxis, minoraxis, 0, 0, 2 * Math.PI);
        ctx.strokeStyle = "#ff0000";
        ctx.stroke();

        const angle = (2 * Math.PI) * (time / planet.days);
        centerX[i] = centerX[j] + majoraxis * Math.cos(angle);
        centerY[i] = centerY[j] + minoraxis * Math.sin(angle);
        const newRadius = planet.radius * scale;

        //drawplanet
        ctx.globalAlpha = 1;
        ctx.drawImage(image[i], 0, 0, image[i].width, image[i].height, centerX[i] - newRadius, centerY[i] - newRadius, 2 * newRadius, 2*newRadius);
    }
    if(play == true){
        time += speed;
    }

    let timeNow = time;
    let j = Math.floor(timeNow/365);
    let stringP = "" + j + "-Year(s), ";
    timeNow = timeNow - 365*j
    j = Math.floor(timeNow);
    stringP += j + "-Day(s), ";
    timeNow = timeNow - j;
    j = Math.round(timeNow*24);
    stringP += j + "-Hour(s)";
    timeDisplay.innerHTML = stringP;

    requestAnimationFrame(drawSolarSystem);
}
//mouse call
function zoom(event){
    var y = event.deltaY;
    if(y > 0 && scale < 4){
        scale *= 1.25;
    } else if( y < 0 && scale > 0.1){
        scale /= 1.25;
    }
}
//button call
function changeZoom(data){
    if (data == 'in' && scale < 4){
        scale *= 1.25;
    }else if(data == 'out' && scale > 0.1){
        scale /= 1.25;
    }
}

function changeSpeed(data){
    if (data == 'fast'){
        speed *= 1.25
    }else if(data == 'slow'){
        speed /= 1.25
    }
}

function playPause(data){
  if(data == 'Play'){
    play = true;
  }else if(data == 'Pause'){
    play = false;
  }
}

function changeCamera(){
    if(topView == true){
      topView = false;
      scale *= 1.25;
    }else if(topView == false){
      topView = true;
      scale /= 1.25;
    }
  }

requestAnimationFrame(drawSolarSystem);