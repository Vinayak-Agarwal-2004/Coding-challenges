// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge #115: Snake Game Redux
// https://youtu.be/OMoVcohRgZA
let video;

 let label = "Waiting";

function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VMUG9YrcM/'+'model.json');
  }



let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {

  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();

  createCanvas(640, 480);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (key == ' ') {
    snake.grow();
  }

}

function draw() {
  //Draw the video
  image(video, 0, 0);
  //Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, 10 , 50);

  scale(rez);
  background(255);
  
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();


  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}
function classifyVideo(){
  classifier.classify(video, gotResults);
}

function gotResults(error, results){
  if(error){
    console.error(error);
    return
  }
    label = results[0].label;
    classifyVideo();
} 