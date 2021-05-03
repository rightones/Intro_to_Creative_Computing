let sliderPoly;
let sliderRotate;
let sliderSize;
let colorPicker;

function setup() {
  createCanvas(windowWidth, windowHeight);
    colorPicker = createColorPicker(color(random(256), random(256), random(256))).position(0, 130).center("horizontal");
  background(colorPicker.color());
  sliderPoly = createSlider(3, 8, random(3, 9), 1).position(0, 60).center("horizontal");
    text("다각형", width/2-100, 78);
  sliderRotate = createSlider(0, 180, random(0, 181)).position(0, 80).center("horizontal");
  text("회전", width/2-100, 98);
  sliderSize = createSlider(10, 120, random(0, 181)).position(0, 100).center("horizontal");
  text("크기", width/2-100, 118);

    rectMode(CENTER);

    fill(255);
  square(width/2, height/2, 250);
 
}

function draw() {

  
  push();
  fill(colorPicker.color());
  translate(width/2, height/2);
  rotate(sliderRotate.value()*PI/180);
  polygon(0, 0, sliderSize.value(), sliderPoly.value());
  pop();
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
