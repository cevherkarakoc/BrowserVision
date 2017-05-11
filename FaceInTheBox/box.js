var capture;
var pre;
var fr = 8;
var headPosition;


function setup() {
  createCanvas(640, 480, WEBGL);
  frameRate(fr);
  
  var constraints = {
    video: {
      mandatory: {
        minWidth: 640,
        minHeight: 480
      },
      optional: [
        { maxFrameRate: fr }
      ]
    },
    audio: false
  };
  capture = createCapture(constraints);
  pre = createImage(640, 480);

  headPosition = {x: 0, y: 0};
  fill(225,125,150);
  var fov = 60 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10);
}

function draw() {
  background(51);
  var tresh = 100*100;
  capture.loadPixels();
  pre.loadPixels();
  var avgX = 0;
  var avgY = 0;
  var c = 0;
  
  for(var y=0;y<capture.height;y+=20){
    for(var x=0;x<capture.width;x+=20){
      var index = (x + y * capture.width ) * 4;

      var r = capture.pixels[index];
      var g = capture.pixels[index+1];
      var b = capture.pixels[index+2];

      var rPre = pre.pixels[index];
      var gPre = pre.pixels[index+1];
      var bPre = pre.pixels[index+2];

      var di = distSq(r,g,b,rPre,gPre,bPre);

      if(di > tresh){
        //particles.push(new Particle(x,y));
        avgX += x;
        avgY += y;
        c++;
      }
    }
  }

  if(c>0){
    avgX = avgX / c;
    avgY = avgY / c;
    var tempX = map(avgX, 0, 640, -150, 150);
    var tempY = map(avgY, 0, 480, -150, 150);
    headPosition.x = lerp(headPosition.x,tempX,0.1);
    headPosition.y = lerp(headPosition.y,tempY,0.1);
  }

  camera(headPosition.x ,headPosition.y, 0);

  push();
  translate(-100, 0, -100) ;
  fill(225,75,125);
  box(100,100,1000);
  pop();

  push();
  translate(100, 0, -100) ;
  fill(125,75,225);
  box(100,100,1000);
  pop();

  push();
  translate(0, 100, -100) ;
  fill(75,225,125);
  box(100,100,1000);
  pop();

  push();
  translate(0, -100, -100) ;
  fill(225,125,75);
  box(100,100,1000);
  pop();


  pre.copy(capture,0,0,width,height,0,0,width,height);
}
