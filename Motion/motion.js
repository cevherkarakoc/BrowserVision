var capture;
var pre;
var fr = 8;

var particles = [];

function setup() {
  createCanvas(640, 480);
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
}

function draw() {
  var tresh = 100*100;
  capture.loadPixels();
  pre.loadPixels();
  

  if(frameCount>10){
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
        particles.push(new Particle(x,y));
      }
    }
  }
}

  image(capture,0,0,width,height);
  
  for(var i=particles.length-1;i>=0;i--){
    particles[i].update();
    particles[i].draw();
    if(particles[i].lifespan <= 0) {
        particles.splice(i,1); 
    }
  }

  pre.copy(capture,0,0,width,height,0,0,width,height);
}
