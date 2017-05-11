function Particle(x,y){
  this.x=x;
  this.y=y;
  this.r = random(3,7);
  this.lifespan = 25;
};

Particle.prototype.update = function(){
  this.y += -7;
  this.x +=  random(-10,+10);
  this.lifespan -= 2;
};


Particle.prototype.draw = function(){
  fill(226,88,34,this.lifespan*100);
  noStroke();
  ellipse(this.x,this.y,this.r);
};