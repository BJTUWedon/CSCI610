function myLine (x1, y1, x2, y2)
{
  // insert your code here to draw a line from (x1, y1) to (x2, y2)
  // using only calls to point().
  // your code should implement the Midpoint algorithm
  let x = x1
  let y = y1
  let y_t = y1
  point(x, y)

  if (x == x2) {
    while (y != y2){
      y += 1
      point(x, y)
    }
  }
  else {
    let k = (y2-y1)/(x2-x1)
    while (x != x2) {
    let height = Math.round(y+k-y_t)
    y_t += height
    point(x, y_t)
    x += 1
    y += k
  }
  }
}

function isInside(x, y, x0, y0, x1, y1, x2, y2)
{
  let v0 = createVector(x0, y0)
  let v1 = createVector(x1, y1)
  let v2 = createVector(x2, y2)
  let p = createVector(x, y)
  let a = p5.Vector.cross(p5.Vector.sub(p, v0), p5.Vector.sub(v1, v0))
  let b = p5.Vector.cross(p5.Vector.sub(p, v1), p5.Vector.sub(v2, v1))
  let c = p5.Vector.cross(p5.Vector.sub(p, v2), p5.Vector.sub(v0, v2))

  if (a.z>=0 && b.z>=0 && c.z>=0)
  {
    return 1
  }
  else
  {
    return 0
  }
}

function myTriangle (x0, y0, x1, y1, x2, y2)
{
  // insert your code here to draw a triangle with vertices (x0, y0), (x1, y1) and (x2, y2) 
  // using only calls to point().
  // your code should implement the the algorithm presented in the video
  for(var x=0; x<500; x++)
  {
    for(var y=0; y<500; y++)
    {
      if (isInside(x, y, x0, y0, x1, y1, x2, y2)==1)
      {
        point(x, y)
      }
    }
  }
}

// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

let doMine;
let scene;
let backgroundColor;

function setup () 
{
  createCanvas (500, 500);
  doMine = true;
  scene = 1;
  backgroundColor = color (150, 150, 150);
  background (backgroundColor);
}

function draw ()
{
  fill (0,0,0);
    if (doMine) text ("my solution", 20, 475);
    else text ("reference", 20, 475);
    
  if (scene == 1) doLines();
  if (scene == 2) doHouse();
  
}

function doHouse()
{
  if (!doMine) {
    fill (255, 0, 0);
    stroke (255,0,0);
    triangle (200, 300, 300, 200, 200, 200);
    triangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 255);
    stroke (0,0,255);
    triangle (200,200, 300, 200, 250, 150);
    stroke (0,255,0);
    fill (0,255,0);
    triangle (250, 300, 275, 300, 250, 250);
    triangle (275, 300, 275, 250, 250, 250);
  }
  else {
    fill (128, 0, 0);
    stroke (128,0,0);
    myTriangle (200, 300, 300, 200, 200, 200);
    myTriangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 128);
    stroke (0,0,128);
    myTriangle (200,200, 300, 200, 250, 150);
    stroke (0,128,0);
    fill (0,128,0);
    myTriangle (250, 300, 275, 300, 250, 250);
    myTriangle (275, 300, 275, 250, 250, 250);
  }
}

function doLines()
{
  if  (!doMine) {
    stroke (255, 255, 255);
    line (50, 250, 450, 250);
    line (250, 50, 250, 450);
    line (50, 450, 450, 50);
    line (50, 50, 450, 450);
  }
  else {
    stroke (0, 0, 0);
    myLine (50, 250, 450, 250);
    myLine (250, 50, 250, 450);
    myLine (50, 450, 450, 50);
    myLine (50, 50, 450, 450);
  }
}

function keyPressed()
{
  if (key == '1') 
  {
    background (backgroundColor);
    scene = 1;
  }
  
  if (key == '2') 
  {
    background (backgroundColor);
    scene = 2;
  }
  
  if (key == 'm') 
  {
    background (backgroundColor);
    doMine = !doMine;
  }
}