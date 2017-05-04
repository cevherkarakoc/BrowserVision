var capture;

var rT = 0;
var gT = 0;
var bT = 255;
var drawCam = true;
var lerpX;
var lerpY;
var dots = [];
var theAlpha = 255;

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  //capture.hide();
  //noStroke();
  noFill();
  strokeWeight(5);
  strokeCap(ROUND);
  strokeJoin(ROUND);
}

function draw() {
  var clX = -1;
  var clY = -1;
  var tresh = 100;
  capture.loadPixels();
  
  if(drawCam){
    background(51);
    image(capture, 0, 0, width, height);
  }else{
    background(51,51,51,255);
  }

  for(var y=0;y<capture.height;y+=1){
    for(var x=0;x<capture.width;x+=1){
      var index = (x + y * capture.width ) * 4;
      var r = capture.pixels[index];
      var g = capture.pixels[index+1];
      var b = capture.pixels[index+2];
      var a = capture.pixels[index+3];
      //var gray = 0.2126*r + 0.7152*g + 0.0722*b;
      var di = distSq(r,g,b,rT,gT,bT);
      if(di < tresh){
        tresh = di;
        clX = x;
        clY = y;
      } 
    }
  } 
  
  if(clX>-1){
    lerpX = lerp(lerpX,clX,0.1);
    lerpY = lerp(lerpY,clY,0.1);
    dots.push({x: lerpX, y: lerpY});
  }
  
  stroke(rT,gT,bT,theAlpha);
  
  beginShape();
  for(var i=0;i<dots.length;i++){
    var dot = dots[i];
    vertex(dot.x,dot.y);
  }
  endShape();
  if(dots.length>500){
    dots.shift();
  }
}

function mousePressed(){
  var index = (mouseX + mouseY * capture.width ) * 4;
  rT = capture.pixels[index];
  gT = capture.pixels[index+1];
  bT = capture.pixels[index+2];
  lerpX = mouseX;
  lerpY = mouseY;
  dots = [];
}

function keyPressed() {
  if (keyCode === 32) {
    drawCam = !drawCam;
    background(51);
    theAlpha = 200;
    if(drawCam) theAlpha = 255;
  }
  return false;
}
