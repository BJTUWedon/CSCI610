//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//

function subCube (x0,y0,z0,x1,y1,z1,x2,y2,z2, subdivisions) {
    addTriangle((x0+x1)/2, (y0+y1)/2, (z0+z1)/2, (x1+x2)/2, (y1+y2)/2, (z1+z2)/2, (x0+x2)/2, (y0+y2)/2, (z0+z2)/2);
    subdivisions -= 1
    if (subdivisions > 1)
    {
        subCube((x0+x1)/2, (y0+y1)/2, (z0+z1)/2, (x1+x2)/2, (y1+y2)/2, (z1+z2)/2, (x0+x2)/2, (y0+y2)/2, (z0+z2)/2)
        subCube(x0, y0, z0, (x0 + x1)/2, (y0 + y1)/2, (z0 + z1)/2, (x0+x2)/2, (y0+y2)/2, (z0+z2)/2)
        subCube(x2, y2, z2, (x0+x2)/2, (y0+y2)/2, (z0+z2)/2, (x1+x2)/2, (y1+y2)/2, (z1+z2)/2)
        subCube(x1, y1, z1, (x1+x2)/2, (y1+y2)/2, (z1+z2)/2, (x0+x1)/2, (y0+y1)/2, (z0+z1)/2)
    }
}


function makeCube (subdivisions)  {
    addTriangle(0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5)
    addTriangle(-0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5)
    addTriangle(0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5)
    addTriangle(-0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5)
    addTriangle(0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5)
    addTriangle(0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5)
    addTriangle(-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5)
    addTriangle(-0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5)
    addTriangle(0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5)
    addTriangle(-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5)
    addTriangle(0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5)
    addTriangle(-0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5)

    if (subdivisions > 1)
    {
        subCube(0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, subdivisions)
        subCube(-0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, subdivisions)
        subCube(0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, subdivisions)
        subCube(-0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, subdivisions)
        subCube(0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, subdivisions)
        subCube(0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, subdivisions)
        subCube(-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, subdivisions)
        subCube(-0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, subdivisions)
        subCube(0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, subdivisions)
        subCube(-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, subdivisions)
        subCube(0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, subdivisions)
        subCube(-0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, subdivisions)
}
}


//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder (radialdivision,heightdivision){
    ra = 360/radialdivision
    ha = 1/heightdivision
    count = ra
    list = []
    x1 = 0.5
    y1 = 0
    console.log(heightdivision)
    while (count <=361){
    if (count<=90){
        x = Math.cos(radians(count))*0.5
        y = Math.sin(radians(count))*0.5
    }
    if (count>90 & count <= 180){
        x = -Math.cos(radians(180-count))*0.5
        y = Math.sin(radians(180-count))*0.5
    }
    if (count>180 & count <= 270){
        x = -Math.cos(radians(count-180))*0.5
        y = -Math.sin(radians(count-180))*0.5
    }
    if (count>270 & count <= 361){
        x = Math.cos(radians(360-count))*0.5
        y = -Math.sin(radians(360-count))*0.5
    }
    addTriangle(0, 0, 0.5, x1, y1, 0.5, x, y, 0.5)
    addTriangle(0, 0, -0.5, x1, y1, -0.5, x, y, -0.5)
    height_now = 0.5
    while (height_now>-0.499){
        addTriangle(x, y, height_now, x1, y1, height_now, x, y, height_now-ha)
        addTriangle(x1, y1, height_now, x1, y1, height_now-ha, x, y, height_now-ha)
        height_now -= ha
    }
    count += ra
    x1 = x
    y1 = y
    }
}


//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone (radialdivision, heightdivision) {
    // fill in your code here.
    ra = 360/radialdivision
    count = ra
    list = []
    x1 = 0.5
    y1 = 0
    console.log(heightdivision)
    while (count <=361){
    if (count<=90){
        x = Math.cos(radians(count))*0.5
        y = Math.sin(radians(count))*0.5
    }
    if (count>90 & count <= 180){
        x = -Math.cos(radians(180-count))*0.5
        y = Math.sin(radians(180-count))*0.5
    }
    if (count>180 & count <= 270){
        x = -Math.cos(radians(count-180))*0.5
        y = -Math.sin(radians(count-180))*0.5
    }
    if (count>270 & count <= 361){
        x = Math.cos(radians(360-count))*0.5
        y = -Math.sin(radians(360-count))*0.5
    }
    addTriangle(0, 0, -0.5, x1, y1, -0.5, x, y, -0.5)
    dh = 1/heightdivision
    dx1 = x1/heightdivision
    dx = x/heightdivision
    dy1 = y1/heightdivision
    dy = y/heightdivision
    nh = 0.5
    nx1 = dx1
    nx = dx
    ny1 = dy1
    ny = dy
    addTriangle(0, 0, 0.5, nx1, ny1, nh-dh, nx, ny, nh-dh)
    nh -= dh
    while (nh > -0.499) {
        addTriangle(nx, ny, nh, nx1, ny1, nh, nx+dx, ny+dy, nh-dh)
        addTriangle(nx1, ny1, nh, nx1+dx1, ny1+dy1, nh-dh, nx+dx, ny+dy, nh-dh)
        nh -= dh
        nx1 += dx1
        nx += dx
        ny1 += dy1
        ny += dy
    }
    count += ra
    x1 = x
    y1 = y
    }
}
    
//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {
    // fill in your code here.
}


////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {

    
    var nverts = points.length / 4;
    
    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
    
    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++
    
    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}

