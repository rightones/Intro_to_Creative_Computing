class Element {
  constructor(letter) {
    this.initialX = random(0, width);
    this.position = new p5.Vector(this.initialX, 0);
    this.minSpeed = random(0.5, 2);
    this.maxSpeed = random(this.minSpeed, 3);
    this.lifespan = 0;
    this.degree = random(-20, 20);
    this.size = letter ? random(5, 60) : random(20, 30);
    this.alpha = letter ? random(160, 255) : random(60, 60);
    this.letter = letter || "";
  }
  
  isDead() {
    if (this.position.y > height) {
      return true;
    }
    return false;
  }
  
  move() {
    const x = map(mouseX - this.position.x, -width, width, -20, 20);
    const xs = (1 - (1.2/width*(this.position.x - mouseX))**2 );
    const y = map(mouseY, 0, height, this.minSpeed, this.maxSpeed);
    this.position.set(this.initialX + x * xs, this.position.y);
    this.position.add(0, y);
    this.lifespan = map(this.position.y, 0, height, 0, 100);
    this.degree += sin(this.lifespan/10)/10000 * atan2(this.position.y - mouseY, this.position.x - mouseX) * 180 / PI;
  }
  
  render() {
    push();
    if (!this.letter) {
      const c = color("white");
      c.setAlpha(this.alpha);
      fill(c);
      noStroke();
      translate(this.position.x, this.position.y);
      rotate(this.degree);
      ellipse(0, 0, this.size/2, this.size);
    } else {
      const c = color("#D98B8B");
      c.setAlpha(this.alpha);
      fill(c);
      textSize(this.size);
      translate(this.position.x, this.position.y);
      rotate(this.degree);
      text(this.letter, 0, 0);
    }
    pop();
  }
}

class FlowerSystem {
  constructor() {
    this.status = [];
  }
  addFlowers(count) {
    for (let i = 0; i < count; i++){
      this.status.push(new Element());
    }
  }
  render() {
    this.status.forEach((instance, index) => {
      instance.move();
      instance.render();
      if (instance.isDead()) {
        this.status.splice(index, 1);
      }
    });
  }
}

class TextSystem {
  constructor() {
    this.status = [];
  }
  addLetters(text) {
    text.split("").forEach(letter => {
      if (letter !== " "){
        this.status.push(new Element(letter));
      }
    })
  }
  render() {
    this.status.forEach((instance, index) => {
      instance.move();
      instance.render();
      if (instance.isDead()) {
        instance.position.set(instance.position.x, 0);
        instance.initialX = random(0, width);
      }
    });
  }
}

const flowerInstance = new FlowerSystem();
const textInstance = new TextSystem();
let slider;
let sliderPressed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  flowerInstance.addFlowers(100);
  slider = createSlider(5, 50, 10, 1);
  slider.position(width/2, 20);
  slider.center("horizontal");
  slider.style('width', '150px');
  slider.mousePressed(function() {
    sliderPressed = true;
  }).mouseReleased(function() {
    sliderPressed = false;
  })
}

let status = 0;
let textInput = "내가 그의 이름을 불러주기 전에는\n그는 다만\n하나의 몸짓에 지나지 않았다.\n\n내가 그의 이름을 불러주었을 때,\n그는 나에게로 와서\n꽃이 되었다.\n\n내가 그의 이름을 불러준 것처럼\n나의 이 빛깔과 향기에 알맞는\n누가 나의 이름을 불러다오.\n\n그에게로 가서 나도\n그의 꽃이 되고 싶다.\n\n우리들은 모두\n무엇이 되고 싶다.\n너는 나에게 나는 너에게\n잊혀지지 않는 하나의 눈짓이 되고 싶다.";
let drawToggle = false;

function drawBefore() {
  
  background("#F2D0D0");
  
  const inp = createElement('textarea', '').attribute("placeholder", "내가 그의 이름을 불러주기 전에는\n그는 다만\n하나의 몸짓에 지나지 않았다.\n\n내가 그의 이름을 불러주었을 때,\n그는 나에게로 와서\n꽃이 되었다.\n\n내가 그의 이름을 불러준 것처럼\n나의 이 빛깔과 향기에 알맞는\n누가 나의 이름을 불러다오.\n\n그에게로 가서 나도\n그의 꽃이 되고 싶다.\n\n우리들은 모두\n무엇이 되고 싶다.\n너는 나에게 나는 너에게\n잊혀지지 않는 하나의 눈짓이 되고 싶다.");
  inp.position(width/2, 260);
  inp.size(500, 350);
  inp.center("horizontal");
  inp.input(function() {
    textInput=inp.value();
  });
  inp.style("text-align", "center").style("border", "none").style("background", "#ffffffbb");
  const button = createButton('시작하기');
  button.position(width/2, 630);
  button.size(80, 40);
  button.center("horizontal");
  button.style("border", "none").style("background", "#ffffffbb");
  button.mouseClicked(function() {
    status = 1;
    textInstance.addLetters(textInput);
    inp.remove();
    button.remove();
  });
}

function drawAfter() {
  textInstance.render();
}

function draw() {
  background("#F2D0D0");
  flowerInstance.render();
  if (random(slider.value()) < 2) {
    flowerInstance.addFlowers(random(1, 10));
  }
  if (status) {
    drawAfter();
  } else if (!drawToggle) {
    drawBefore();
    drawToggle = true;
  } else {
      fill("#694874");
  textSize(50);
  text("당신의 봄은 언제인가요?", width/2, 130);
  
  fill("#D98B8B");
  textSize(20);
  text("아래에 당신의 봄을 표현하는 글을 적어보세요.", width/2, 180);
  }
}

function mousePressed() {
  if (status && !sliderPressed) {
    status = 0;
    drawToggle = false;
    textInstance.status = [];
    textInput = "내가 그의 이름을 불러주기 전에는\n그는 다만\n하나의 몸짓에 지나지 않았다.\n\n내가 그의 이름을 불러주었을 때,\n그는 나에게로 와서\n꽃이 되었다.\n\n내가 그의 이름을 불러준 것처럼\n나의 이 빛깔과 향기에 알맞는\n누가 나의 이름을 불러다오.\n\n그에게로 가서 나도\n그의 꽃이 되고 싶다.\n\n우리들은 모두\n무엇이 되고 싶다.\n너는 나에게 나는 너에게\n잊혀지지 않는 하나의 눈짓이 되고 싶다.";
  }
}