let system;
let amount=1;
let pressed=false;

let TimeZone = function(position, radius) {
  this.position = position.copy();
  this.newPosition = position.copy();
  this.strength = this.newPosition.sub(createVector(mouseX, mouseY)).mag();
  this.radius = radius;
}

TimeZone.prototype.update = function() {
  this.newPosition = this.position.copy();
  this.strength = this.newPosition.sub(createVector(mouseX, mouseY)).mag();
  this.display();
}

TimeZone.prototype.display = function() {
  noFill();
  stroke(255, 5);
  strokeWeight(1);
  ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
  let tzcolor = color("white");
  tzcolor.setAlpha(200 - 200*sin(this.strength / 255/2))
  stroke(tzcolor);
  fill("#00000000");
  strokeWeight(4-4*sin(this.strength / 255 / 2));
  ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
}

let TimeZoneSystem = function() {
  this.canvas = createVector(width, height);
  this.timezones = [];
}

TimeZoneSystem.prototype.addTimeZones = function(radius, distance) {
  for(let x = distance + radius; x < this.canvas.x; x += distance + radius * 2) {
    for(let y = distance + radius; y < this.canvas.y; y += distance + radius * 2) {
      this.timezones.push(new TimeZone(createVector(x, y), radius));
    }
  }
}

TimeZoneSystem.prototype.addTimeZone = function() {
  for(let i=0; i<amount; i++){
      this.timezones.push(new TimeZone(createVector(mouseX+random(-100,100), mouseY+random(-100,100)), 20));
  }
}


TimeZoneSystem.prototype.run = function() {
  this.timezones.forEach(timezone => timezone.update());
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  system = new TimeZoneSystem();
  system.addTimeZones(20, 80);
  background("#201240");
  frameRate(24);
  
  buttonp = createButton('+');
  buttonp.position(width/2-60, 35);
  buttonp.mousePressed(()=>{amount++;pressed=true;}).mouseReleased(()=>{pressed=false;});
  
  
  buttonm = createButton('-');
  buttonm.position(width/2+40, 35);
  buttonm.mousePressed(()=>{if(amount>0){amount--;}pressed=true;}).mouseReleased(()=>{pressed=false;});
}

function draw() {
  let gradColor = color("#201240");
  gradColor.setAlpha(50);
  background(gradColor);
  gradColor = color("#CDEAF5");
  gradColor.setAlpha(230);
  fill(gradColor);
  ellipse(mouseX, mouseY, 800, 800)
  noFill();
  for(let i=0; i<10; i++){
    let gradColor = color(map(i, 0, 10, 205, 140), map(i, 0, 10, 234, 3), map(i, 0, 10, 245, 53));
    gradColor.setAlpha(200-i*20);
    stroke(gradColor);
    strokeWeight(100+sin(i/20)*50);
    ellipse(mouseX, mouseY, 600+sin(i/10)*1000,600+sin(i/10)*1000);
  }
  system.run();
  noStroke();
  textStyle(BOLD);
  fill(color("#8c033570")).textSize(40);
  text("it's your day", width/2-textWidth("it's your day")/2, height/2);
  
  fill(color("white")).textSize(20);
  text(amount, width/2-textWidth(amount)/2, 50);
}

function mousePressed() {
  if(!pressed){
  system.addTimeZone();
  }
}