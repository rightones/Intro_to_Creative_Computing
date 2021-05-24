function structStrip() {
    let startV;
    let endV;
    let width;
    let height;
    let color;
    let text;
  let originalText;
  let newText;
}
let isDrawing = false;
let instance;
let slider;
let slider2;
let colorPicker;
let checkbox;
let input;
let DOMClicked = [];
class System {
    constructor() {
        this.stack = [];
    }
    push(height, color, text, alpha) {
        const i = this.stack[this.stack.push(new structStrip()) - 1];
        i.height = height;
        i.color = color;
        i.color.setAlpha(alpha);
        i.text = " " + text;
        i.originalText = " " + text;
        i.startV = createVector(mouseX, mouseY);
    }
    update() {
        const i = this.stack[this.stack.length - 1];
        i.endV = createVector(mouseX, mouseY);
        i.width = i.startV.dist(i.endV);
      
        const t = i.originalText;
        if (textWidth(i.text) < i.width) {
          while (textWidth(i.text) < i.width){
            i.text += " ";
                    i.text += t;}
                  
                } 
      i.newText = i.text;

    }
    render() {
        this.stack.forEach(e => {
          const c = color(0);
          c.setAlpha(20);
          background(c);
            push();
            translate(e.startV);
            rotate(p5.Vector.sub(e.endV, e.startV).heading());
            fill(e.color);
          
          push();
            stroke(255);
          strokeWeight(2);
            rect(0, -(e.height / 2), e.width, e.height);
          
          pop();
            fill(255);
          
          textSize(e.height);
          strokeWeight(5);
          if(textWidth(e.text)>e.width){
            
            e.newText = e.text;
                  if (e.width){
                  while (textWidth(e.newText) > e.width) {
                    e.newText = e.newText.slice(0, -1);
                  }}}
          if (!e.width){
            e.newText="";
          }
            text(e.newText, 0, e.height / 3);
            pop();
        });
    }
}

function DOMPressed() {
    DOMClicked.push(true);
}

function DOMReleased() {
  DOMClicked.pop();
}

function InputMoved() {
  if(DOMClicked.length>1){
  DOMClicked.pop();}
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    instance = new System();
  createSpan("크기").style("color", "#fff").position(10, 42);
  slider = createSlider(0, 100, random(5, 100)).position(40, 40).style('width', '80px').mousePressed(DOMPressed).mouseReleased(DOMReleased);
  
  createSpan("투명도").style("color", "#fff").position(140, 42);
  slider2 = createSlider(0, 255, random(160, 200)).position(180, 40).style('width', '80px').mousePressed(DOMPressed).mouseReleased(DOMReleased);
  colorPicker = createColorPicker(color(random(255), random(255), random(255))).position(10, 70).mousePressed(DOMPressed).mouseReleased(DOMReleased);
  checkbox = createCheckbox('랜덤', true).style("color", "#fff").position(80, 75).mousePressed(DOMPressed).mouseReleased(DOMReleased);
  inp = createInput("죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다.").position(10, 10).size(400).mousePressed(DOMPressed).mouseReleased(DOMReleased).mouseMoved(InputMoved);
}

function draw() {
    background(0);
    if (isDrawing && mouseIsPressed && !DOMClicked.length) {
        instance.update();
    } else if (!isDrawing && mouseIsPressed && !DOMClicked.length) {
        instance.push(slider.value(), colorPicker.color(), inp.value(), slider2.value());
        instance.update();
        isDrawing = true;
      if (checkbox.checked()){
      slider.value(random(5, 100));
      slider2.value(random(140, 255));
        
      colorPicker.value(color(random(255), random(255), random(255)).toString('#rrggbb'));}
        console.log("push");
    } else if (isDrawing) {
        isDrawing = false;
    }
    instance.render();
}