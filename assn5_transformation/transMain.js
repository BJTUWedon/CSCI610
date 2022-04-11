  'use strict';

  // Global variables that are set and used
  // across the application
  let gl, program;
  
  // Global declarations of objects that you will be drawing
  var myTeapot = null;
  var myCube = null;
  var myCylinder = null;
  var myCone = null;


//
// A function that creates shapes to be drawn and creates a VAO for each
//
// We start you out with an example for the teapot.
//
function createShapes() {

    myTeapot = new Teapot();
    myTeapot.VAO = bindVAO (myTeapot);
    myCube = new Cube(5);
    myCube.VAO = bindVAO (myCube)
    myCylinder = new Cylinder(10, 10);
    myCylinder.VAO = bindVAO (myCylinder);
    myCone = new Cone(30, 4);
    myCone.VAO = bindVAO (myCone);
}


//
// Set up your camera and your projection matrices
//
function setUpCamera() {
    
    // set up your projection
    // defualt is orthographic projection
    let projMatrix = glMatrix.mat4.create();
//    glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
//    glMatrix.mat4.perspective(projMatrix, 2, 1, 1.0, 300.0);
    glMatrix.mat4.frustum(projMatrix, -5, 5, -5, 5, 3, 300);
    gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

    
    // set up your view
    // defaut is at (0,0,-5) looking at the origin
    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [0, 3, -6], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);
}


//
// Use this function to draw all of your shapes.
// Recall that VAOs should have been set up the call to createShapes()
// You'll have to provide a Model Matrix for each shape to be drawn that
// places the object in the world.
//
// An example is shown for placing the teapot
//


function drawShapes() {
    //teapot

    let modelTeapot = glMatrix.mat4.create();
    glMatrix.mat4.translate(modelTeapot, modelTeapot, [0, 1, 0])
    glMatrix.mat4.rotateY (modelTeapot,  modelTeapot, radians(180.0))
    gl.uniformMatrix4fv (program.uModelT, false, modelTeapot);
    gl.bindVertexArray(myTeapot.VAO);
    gl.drawElements(gl.TRIANGLES, myTeapot.indices.length, gl.UNSIGNED_SHORT, 0);

    //teapot-top
    let modelTeapot_top = glMatrix.mat4.create();
    glMatrix.mat4.rotateY(modelTeapot_top, modelTeapot_top, radians(90))
    glMatrix.mat4.rotateX(modelTeapot_top, modelTeapot_top, radians(180))
    glMatrix.mat4.translate(modelTeapot_top, modelTeapot_top, [-1, -0.6, 0])
    glMatrix.mat4.scale(modelTeapot_top, modelTeapot_top, [3, 0.5,3])
    gl.uniformMatrix4fv(program.uModelT, false, modelTeapot_top);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    //teapot-mid
    let modelTeapot_mid = glMatrix.mat4.create();
    glMatrix.mat4.rotateX(modelTeapot_mid, modelTeapot_mid, radians(-90))
    glMatrix.mat4.translate(modelTeapot_mid, modelTeapot_mid, [0, -0.2, -0.5])
    glMatrix.mat4.scale(modelTeapot_mid, modelTeapot_mid, [1.8, 1.8, 1.8])
    gl.uniformMatrix4fv(program.uModelT, false, modelTeapot_mid);
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);

    //teapot-down
    let modelTeapot_down = glMatrix.mat4.create();
    glMatrix.mat4.rotateY(modelTeapot_down, modelTeapot_down, radians(90))
    glMatrix.mat4.rotateX(modelTeapot_down, modelTeapot_down, radians(180))
    glMatrix.mat4.translate(modelTeapot_down, modelTeapot_down, [-2, 3, 0])
    glMatrix.mat4.scale(modelTeapot_down, modelTeapot_down, [3, 0.5,3])
    gl.uniformMatrix4fv(program.uModelT, false, modelTeapot_down);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    //cylinder
    let modelCylinder = glMatrix.mat4.create();
    glMatrix.mat4.translate(modelCylinder, modelCylinder, [-4, 1.7, 0])
    glMatrix.mat4.rotateY (modelCylinder,  modelCylinder, radians(180.0))
    glMatrix.mat4.scale(modelCylinder, modelCylinder, [1.5, 1.5,1.5])
    gl.uniformMatrix4fv (program.uModelT, false, modelCylinder);
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);

    //cylinder-top
    let modelCylinder_top = glMatrix.mat4.create();
    glMatrix.mat4.rotateY(modelCylinder_top, modelCylinder_top, radians(90))
    glMatrix.mat4.rotateX(modelCylinder_top, modelCylinder_top, radians(180))
    glMatrix.mat4.translate(modelCylinder_top, modelCylinder_top, [-0.5, -0.8, 4])
    glMatrix.mat4.scale(modelCylinder_top, modelCylinder_top, [3, 0.5,3])
    gl.uniformMatrix4fv(program.uModelT, false, modelCylinder_top);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    //cylinder-mid
    let modelCylinder_mid = glMatrix.mat4.create();
    glMatrix.mat4.rotateX(modelCylinder_mid, modelCylinder_mid, radians(-90))
    glMatrix.mat4.translate(modelCylinder_mid, modelCylinder_mid, [-4, -0.2, -0.5])
    glMatrix.mat4.scale(modelCylinder_mid, modelCylinder_mid, [1.8, 1.8, 1.8])
    gl.uniformMatrix4fv(program.uModelT, false, modelCylinder_mid);
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);

    //cylinder-down
    let modelCylinder_down = glMatrix.mat4.create();
    glMatrix.mat4.rotateY(modelCylinder_down, modelCylinder_down, radians(90))
    glMatrix.mat4.rotateX(modelCylinder_down, modelCylinder_down, radians(180))
    glMatrix.mat4.translate(modelCylinder_down, modelCylinder_down, [-2, 3, 5])
    glMatrix.mat4.scale(modelCylinder_down, modelCylinder_down, [3, 0.5,3])
    gl.uniformMatrix4fv(program.uModelT, false, modelCylinder_down);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    //cone
    let modelCone = glMatrix.mat4.create();
    glMatrix.mat4.translate(modelCone, modelCone, [3, 2.1, -1.5])
    glMatrix.mat4.rotateX(modelCone, modelCone, radians(-90))
    glMatrix.mat4.scale(modelCone, modelCone, [1, 1,1])
    gl.uniformMatrix4fv (program.uModelT, false, modelCone);
    gl.bindVertexArray(myCone.VAO);
    gl.drawElements(gl.TRIANGLES, myCone.indices.length, gl.UNSIGNED_SHORT, 0);

    //cone-top
    let modelCone_top = glMatrix.mat4.create();
    glMatrix.mat4.rotateY(modelCone_top, modelCone_top, radians(90))
    glMatrix.mat4.rotateX(modelCone_top, modelCone_top, radians(180))
    glMatrix.mat4.translate(modelCone_top, modelCone_top, [-0.5, -0.8, -4])
    glMatrix.mat4.scale(modelCone_top, modelCone_top, [3, 0.5,3])
    gl.uniformMatrix4fv(program.uModelT, false, modelCone_top);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    //cone-mid
    let modelCone_mid = glMatrix.mat4.create();
    glMatrix.mat4.rotateX(modelCone_mid, modelCone_mid, radians(-90))
    glMatrix.mat4.translate(modelCone_mid, modelCone_mid, [4, -0.2, -0.5])
    glMatrix.mat4.scale(modelCone_mid, modelCone_mid, [1.8, 1.8, 1.8])
    gl.uniformMatrix4fv(program.uModelT, false, modelCone_mid);
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);

    //cone-down
    let modelCone_down = glMatrix.mat4.create();
    glMatrix.mat4.rotateY(modelCone_down, modelCone_down, radians(90))
    glMatrix.mat4.rotateX(modelCone_down, modelCone_down, radians(180))
    glMatrix.mat4.translate(modelCone_down, modelCone_down, [-2, 3, -5])
    glMatrix.mat4.scale(modelCone_down, modelCone_down, [3, 0.5,3])
    gl.uniformMatrix4fv(program.uModelT, false, modelCone_down);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

}

///////////////////////////////////////////////////////////////////
//
//   You shouldn't have to edit below this line
//
///////////////////////////////////////////////////////////////////

  // Given an id, extract the content's of a shader script
  // from the DOM and return the compiled shader
  function getShader(id) {
    const script = document.getElementById(id);
    const shaderString = script.text.trim();

    // Assign shader depending on the type of shader
    let shader;
    if (script.type === 'x-shader/x-vertex') {
      shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else if (script.type === 'x-shader/x-fragment') {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else {
      return null;
    }

    // Compile the shader using the supplied shader code
    gl.shaderSource(shader, shaderString);
    gl.compileShader(shader);

    // Ensure the shader is valid
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  // Create a program with the appropriate vertex and fragment shaders
  function initProgram() {
    const vertexShader = getShader('vertex-shader');
    const fragmentShader = getShader('fragment-shader');

    // Create a program
    program = gl.createProgram();
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
    }

    // Use this program instance
    gl.useProgram(program);
    // We attach the location of these shader values to the program instance
    // for easy access later in the code
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aBary = gl.getAttribLocation(program, 'bary');
    program.uModelT = gl.getUniformLocation (program, 'modelT');
    program.uViewT = gl.getUniformLocation (program, 'viewT');
    program.uProjT = gl.getUniformLocation (program, 'projT');
  }

  // creates a VAO and returns its ID
  function bindVAO (shape) {
      //create and bind VAO
      let theVAO = gl.createVertexArray();
      gl.bindVertexArray(theVAO);
      
      // create and bind vertex buffer
      let myVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aVertexPosition);
      gl.vertexAttribPointer(program.aVertexPosition, 4, gl.FLOAT, false, 0, 0);
      
      // create and bind bary buffer
      let myBaryBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myBaryBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.bary), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aBary);
      gl.vertexAttribPointer(program.aBary, 3, gl.FLOAT, false, 0, 0);
      
      // Setting up the IBO
      let myIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

      // Clean
      gl.bindVertexArray(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      
      return theVAO;
    
  }

  
  // We call draw to render to our canvas
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
    // draw your shapes
    drawShapes();

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  // Entry point to our application
  function init() {
      
    // Retrieve the canvas
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
      console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
      return null;
    }


    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
    // Set the clear color to be black
    gl.clearColor(0, 0, 0, 1);
      
    // some GL initialization
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)

    // Read, compile, and link your shaders
    initProgram();
    
    // create and bind your current object
    createShapes();
    
    // set up your camera
    setUpCamera();
    
    // do a draw
    draw();
  }
