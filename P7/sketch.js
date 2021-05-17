function calculateBezier(scale, v1, v2) {
  const v3 = p5.Vector.sub(v2, v1).normalize();
  v3.mult(scale);
  const rv1 = p5.Vector.add(v1, v3);
  v3.mult(1);
  v3.rotate(PI/3);
  const rv2 = p5.Vector.add(v2, v3);
  return [rv1, rv2];
}

class System {
  constructor() {
    this.stack = [];
    this.origins = [];
  }
  init() {
    for(let i=0;i<width;i+=50){
      this.origins.push(createVector(i, 0));
      this.origins.push(createVector(i, height));
    }
    for(let i=0;i<height;i+=50){
      this.origins.push(createVector(0, i));
      this.origins.push(createVector(width, i));
    }
  }
  push() {
    this.stack.push(createVector(mouseX, mouseY));
  }
  render() {
    this.stack.forEach((mouseV, index) => {
      this.origins.forEach((originV) => {
        const [rv1, rv2] = calculateBezier(100, originV, mouseV);
        noFill();
        const v = color(255);
        v.setAlpha(map(Math.pow(index+1, 7), 1, Math.pow(this.stack.length, 7), 1, 150));
        stroke(v);
        bezier(originV.x, originV.y, rv1.x, rv1.y, rv2.x, rv2.y, mouseV.x, mouseV.y);
      });
    });
  }
}

let instance;

function setup() {
  createCanvas(windowHeight, windowHeight);
  framaRate(30);
  instance = new System();
  instance.init();
}

function draw() {
  background("#031236");
  instance.render();
  if(mouseIsPressed){
    instance.push();
    if(instance.stack.length>100) {
      instance.stack.shift();
    }
  }
}

