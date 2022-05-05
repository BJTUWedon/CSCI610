  'use strict';

  // Global variables that are set and used
  // across the application
  let gl;
  // GLSL programs
  let floorProgram;
  let ballProgram;
  let lightProgram;
  // VAOs for the objects
  var myFloor = null;
  var myBall = null;
  var myCone = null;
  var myCylinder = null;
  // textures
  let floorTexture;
  let ballTexture;
  let state = 'open';

  // rotation
//
// create shapes and VAOs for objects.
// Note that you will need to bindVAO separately for each object / program based
// upon the vertex attributes found in each program
//
function createShapes() {
  myFloor = new Cube (20);
  myFloor.VAO = bindVAO(myFloor, floorProgram);

  myBall = new Sphere(20, 20)
  myBall.VAO = bindVAO(myBall, ballProgram);

  myCylinder = new Cylinder(20,20);
  myCylinder.VAO = bindVAO(myCylinder, lightProgram);

  myCone  = new Cone(20,20);
  myCone.VAO = bindVAO(myCone , lightProgram);
}


//
// Here you set up your camera position, orientation, and projection
// Remember that your projection and view matrices are sent to the vertex shader
// as uniforms, using whatever name you supply in the shaders
//
function setUpCamera(program) {
  gl.useProgram(program)
  // set up your projection
  // defualt is orthographic projection
  let projMatrix = glMatrix.mat4.create();
//    glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
//    glMatrix.mat4.perspective(projMatrix, 2, 1, 1.0, 300.0);
  glMatrix.mat4.frustum(projMatrix, -1, 1, -1, 1, 3, 300);
  gl.uniformMatrix4fv (program.uProjT, false, projMatrix);


  // set up your view
  // defaut is at (0,0,-5) looking at the origin
  let viewMatrix = glMatrix.mat4.create();
  glMatrix.mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
  gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);
}


//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
function setUpTextures(program, object){
    gl.useProgram(program);
    // flip Y for WebGL
    gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);

    // get some texture space from the gpu
    // load the actual image
      floorTexture = gl.createTexture();
      var theImage = document.getElementById ('floor-texture')
      theImage.crossOrigin = "";

      theImage.onload = () =>{
      // bind the texture so we can perform operations on it
      gl.bindTexture (gl.TEXTURE_2D, floorTexture);

      // load the texture data
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, theImage.width, theImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, theImage);

      // set texturing parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);}

}


//
//  This function draws all of the shapes required for your scene
//
    function drawShapes(program, object) {
      // which shape are we drawing

      // may need to set different parameters based on the texture
      // you are using...The current texture is found in the global variable
      // curTexture.   If will have the value of "globe", "myimage" or "proc"
      gl.useProgram(program);
      if (object == "floor") {
        // set up your uniform variables for drawing
        gl.activeTexture (gl.TEXTURE0);
        gl.bindTexture (gl.TEXTURE_2D, floorTexture);
        gl.uniform1i (program.uTheTexture, 0);
        gl.uniform1i (program.uType, 0);
        // set up texture uniform & other uniforms that you might
        let modelFloor = glMatrix.mat4.create();
        glMatrix.mat4.translate(modelFloor, modelFloor, [0, -2, 5])
        glMatrix.mat4.scale(modelFloor, modelFloor, [15, 1, 15])
        glMatrix.mat4.rotateY (modelFloor,  modelFloor, radians(0))
        gl.uniformMatrix4fv (program.uModelT, false, modelFloor);
        //Bind the VAO and draw
        gl.bindVertexArray(myFloor.VAO);
        gl.drawElements(gl.TRIANGLES, myFloor.indices.length, gl.UNSIGNED_SHORT, 0);
      } else if (object == "ball") {
        // set up your uniform variables for drawing
        gl.activeTexture (gl.TEXTURE0);
        gl.bindTexture (gl.TEXTURE_2D, ballTexture);
        gl.uniform1i (program.uTheTexture, 0);
        gl.uniform1i (program.uType, 1);
        // set up texture uniform & other uniforms that you might
        // have added to the shader
        let modelBall = glMatrix.mat4.create();
        glMatrix.mat4.translate(modelBall, modelBall, [0, -1, 5])
        glMatrix.mat4.scale(modelBall, modelBall, [1, 1, 1])
        glMatrix.mat4.rotateY (modelBall,  modelBall, radians(0))
        gl.uniformMatrix4fv (program.uModelT, false, modelBall);
        //Bind the VAO and draw
        gl.bindVertexArray(myBall.VAO);
        gl.drawElements(gl.TRIANGLES, myBall.indices.length, gl.UNSIGNED_SHORT, 0);
      } else if (object == "light") {
        gl.uniform1i (program.uType, 1);
        let modelLight1 = glMatrix.mat4.create();
        glMatrix.mat4.translate(modelLight1, modelLight1, [0, 2, 5])
        glMatrix.mat4.scale(modelLight1, modelLight1, [2, 1, 1])
        glMatrix.mat4.rotateY (modelLight1,  modelLight1, radians(0))
        gl.uniformMatrix4fv (program.uModelT, false, modelLight1);
        //Bind the VAO and draw
        gl.bindVertexArray(myCylinder.VAO);
        gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);

        let modelLight2 = glMatrix.mat4.create();
        glMatrix.mat4.translate(modelLight2, modelLight2, [0, 3, 5])
        glMatrix.mat4.scale(modelLight2, modelLight2, [2, 1, 1])
        glMatrix.mat4.rotateY (modelLight2,  modelLight2, radians(0))
        gl.uniformMatrix4fv (program.uModelT, false, modelLight2);
        //Bind the VAO and draw
        gl.bindVertexArray(myCone.VAO);
        gl.drawElements(gl.TRIANGLES, myCone.indices.length, gl.UNSIGNED_SHORT, 0);
      }
    }


  //
  // Use this function to create all the programs that you need
  // You can make use of the auxillary function initProgram
  // which takes the name of a vertex shader and fragment shader
  //
  // Note that after successfully obtaining a program using the initProgram
  // function, you will beed to assign locations of attribute and unifirm variable
  // based on the in variables to the shaders.   This will vary from program
  // to program.
  //
  function initPrograms (vertexid, fragmentid) {

    // set up the per-vertex program
    const vertexShader = getShader(vertexid);
    const fragmentShader = getShader(fragmentid);

    // Create a program
    let program = gl.createProgram();

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
    program.aUV = gl.getAttribLocation(program, 'aUV');

    // uniforms - you will need to add references for any additional
    // uniforms that you add to your shaders
    program.uTheTexture = gl.getUniformLocation (program, 'theTexture');
    program.uTheta = gl.getUniformLocation (program, 'theta');
    program.uModelT = gl.getUniformLocation (program, 'modelT');
    program.uViewT = gl.getUniformLocation (program, 'viewT');
    program.uProjT = gl.getUniformLocation (program, 'projT');
    program.ambientLight = gl.getUniformLocation (program, 'ambientLight');
    program.lightPosition = gl.getUniformLocation (program, 'lightPosition');
    program.lightColor = gl.getUniformLocation (program, 'lightColor');
    program.baseColor = gl.getUniformLocation (program, 'baseColor');
    program.specHighlightColor = gl.getUniformLocation (program, 'specHighlightColor');
    program.ka = gl.getUniformLocation (program, 'ka');
    program.kd = gl.getUniformLocation (program, 'kd');
    program.ks = gl.getUniformLocation (program, 'ks');
    program.ke = gl.getUniformLocation (program, 'ke');
    program.uType = gl.getUniformLocation (program, 'theType');
    program.aNormal = gl.getAttribLocation(program, 'aNormal');
    return program;
  }

  function setUpPhong(program, object) {


      // Recall that you must set the program to be current using
      // the gl useProgram function
      gl.useProgram (program);

      //
      // set values for all your uniform variables
      // including the model transform
      // but not your view and projection transforms as
      // they are set in setUpCamera()
      //
      if (object == "ball"){
        gl.uniform3fv(program.baseColor, glMatrix.vec3.fromValues(0.57, 0.27, 0.03))
      } else if (object == "light") {
        gl.uniform3fv(program.baseColor, glMatrix.vec3.fromValues(0.75, 0.75, 0.75))
      }
      if (state == "open") {
        gl.uniform3fv(program.lightColor, glMatrix.vec3.fromValues(1, 1, 1))
      } else {
        gl.uniform3fv(program.lightColor, glMatrix.vec3.fromValues(0, 0, 0))
      }

      gl.uniform3fv(program.ambientLight, glMatrix.vec3.fromValues(1, 1, 1))
      gl.uniform3fv(program.lightPosition, glMatrix.vec3.fromValues(0, 4, 4))
      gl.uniform3fv(program.specHighlightColor, glMatrix.vec3.fromValues(1, 1, 1))
      gl.uniform1f(program.ka, 0.5);
      gl.uniform1f(program.kd, 0.8);
      gl.uniform1f(program.ks, 0.8);
      gl.uniform1f(program.ke, 10);

      // set up your model transform...Add transformations
      // if you are moiving, scaling, or rotating the object.
      // Default is no transformations at all (identity matrix).
      //
      let modelMatrix = glMatrix.mat4.create();
      gl.uniformMatrix4fv (program.uModelT, false, modelMatrix);
  }


  // creates a VAO and returns its ID
  function bindVAO (shape, program) {
      //create and bind VAO
      let theVAO = gl.createVertexArray();
      gl.bindVertexArray(theVAO);

      // create and bind vertex buffer
      let myVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aVertexPosition);
      gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

      // add code for any additional vertex attribute
      let uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aUV);
      gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);

      let myBaryBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myBaryBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.normals), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aNormal);
      gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);

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


/////////////////////////////////////////////////////////////////////////////
//
//  You shouldn't have to edit anything below this line...but you can
//  if you find the need
//
/////////////////////////////////////////////////////////////////////////////

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


  //
  // compiles, loads, links and returns a program (vertex/fragment shader pair)
  //
  // takes in the id of the vertex and fragment shaders (as given in the HTML file)
  // and returns a program object.
  //
  // will return null if something went wrong
  //
  function initProgram(vertex_id, fragment_id) {
    const vertexShader = getShader(vertex_id);
    const fragmentShader = getShader(fragment_id);

    // Create a program
    let program = gl.createProgram();

    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
      return null;
    }

    return program;
  }


  //
  // We call draw to render to our canvas
  //
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // draw your shapes
    setUpPhong(ballProgram, "ball");
    setUpPhong(lightProgram, "light");
    drawShapes(floorProgram, "floor");
    drawShapes(ballProgram, "ball");
    drawShapes(lightProgram, "light");

    console.log(state);
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

    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);

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
    floorProgram = initPrograms('wireframe-V', 'wireframe-F');
    ballProgram = initPrograms('wireframe-V', 'wireframe-F');
    lightProgram = initPrograms('wireframe-V', 'wireframe-F');


    // create and bind your current object
    createShapes();

    setUpTextures(floorProgram, "floor");
    // do a draw
    setUpCamera(floorProgram);
    setUpCamera(ballProgram);
    setUpCamera(lightProgram);

    draw();
  }
