let list = [];
const radius = 20;
let rand1;
let rand2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  noStroke();
  rand1 = [random(60,128),random(60,128),random(60,128)];
rand2 = [random(60,128),random(60,128),random(60,128)];
  for (let i = 0; i < width/radius; i++) {
  for (let j = 0; j < height/radius; j++) {
  list.push({x:i*radius*2+radius, y:j*radius*2+radius});
}
}
  
  list.map(({x, y})=>{ fill(map(x,0,width,rand1[0],rand2[0]),map(x+y,0,width+height,rand1[1],rand2[1]),map(y,0,height,rand1[2],rand2[2]));
      rect(x-radius,y-radius,radius*2,radius*2);
  })
}

function getAngle(x1, y1, x2, y2) {
	var rad = atan2(y2 - y1, x2 - x1);
	return rad ;
}

function getLocation(angle) {
  x = Math.cos(angle) * radius;
  y = Math.sin(angle) * radius;
  return {x,y};
}

function getDistance(x1, y1, x2, y2) {
  var disX = x1 - x2;
  var disY = y1 - y2;
  return sqrt(Math.abs(disX*disX) + abs(disY*disY));
}

function draw() {
  list.map(({x, y})=>{     fill(map(x,0,width,rand1[0],rand2[0]),map(x+y,0,width+height,rand1[1],rand2[1]),map(y,0,height,rand1[2],rand2[2]),20);
      rect(x-radius,y-radius,radius*2,radius*2);
  })
  list.map(({x, y})=>{
    const angle = getAngle(x,y,mouseX,mouseY);
    const distance = getDistance(x,y,mouseX,mouseY)
    push();
    strokeWeight(7-distance/100);
    stroke(255,80);
    angleMode(DEGREES);
    translate(x, y);
    rotate(angle);
    line(-radius, 0, radius, 0);
    pop();
  })
}
