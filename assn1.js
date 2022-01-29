function drawNameWithLines ()
{
  // insert your code here to draw the letters of your name 
  // using only lines()
  line (35, 45, 100, 100);
  line (165, 45, 100, 100);
  line (100, 100, 100, 200);
  line (250, 45, 300, 200);
  line (300, 200, 350, 100);
  line (350, 100, 400, 200);
  line (400, 200, 450, 45);
}

function drawNameWithTriangles ()
{
  // insert your code here to draw the letters of your name 
  // using only ltriangles()
  triangle (35, 245, 100, 300, 165, 245);
  triangle (100, 300, 98, 400, 102, 400);
  triangle (250, 245, 250, 400, 300, 400);
  triangle (300, 400, 350, 300, 350, 400);
  triangle (350, 400, 350, 300, 400, 400);
  triangle (400, 400, 450, 245, 450, 400);
}

// -----------------------------------------------------------
//
//  Do not edit below this lne
//
// -----------------------------------------------------------

let doLine;
let doTri;
let lineColor;
let fillColor;
let backgroundColor;

function setup() {
  createCanvas(500, 500);
  backgroundColor = color (150, 150, 150);
  background(backgroundColor);
  doLine = false;
  doTri = false;
  lineColor = color (0, 0, 0);
  fillColor = color (255, 0, 0);
}

function draw ()
{
  if (doLine) stroke(lineColor); else stroke (backgroundColor);
  drawNameWithLines();
  
  if (doTri) {
     fill(fillColor);
     stroke(fillColor);
  }
  else {
    fill(backgroundColor);
    stroke(backgroundColor);
  }
  drawNameWithTriangles();
}

function keyPressed()
{
  if (key == 'l') doLine = !doLine;
  if (key == 't') doTri = !doTri;
}