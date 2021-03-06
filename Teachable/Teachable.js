// Add some header info
// For TM template code

// Video
let video;
// For displaying the model
let label="Waiting"

// STEP 1: Load the model!
function preload() {
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VMUG9YrcM/'+'model.json');
}
function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  // STEP 2: Start classifying
  classifyVideo();
}

function classifyVideo(){
  classifier.classify(video, gotResults);
}

// STEP 2 classify!

function draw() {
  background(0);
  
  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width/2, height - 16);

}


// STEP 3: Get the classification!
function gotResults(error, results){
  if(error){
    console.error(error);
    return
  }
    label = results[0].label;
    classifyVideo();
}