class cgIShape {
    constructor () {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }
    
    addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {
        var nverts = this.points.length / 4;
        
        // push first vertex
        this.points.push(x0);  this.bary.push (1.0);
        this.points.push(y0);  this.bary.push (0.0);
        this.points.push(z0);  this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
        
        // push second vertex
        this.points.push(x1); this.bary.push (0.0);
        this.points.push(y1); this.bary.push (1.0);
        this.points.push(z1); this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++
        
        // push third vertex
        this.points.push(x2); this.bary.push (0.0);
        this.points.push(y2); this.bary.push (0.0);
        this.points.push(z2); this.bary.push (1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }
}

class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
    }

    subCube (x0,y0,z0,x1,y1,z1,x2,y2,z2, subdivisions) {
    this.addTriangle((x0+x1)/2, (y0+y1)/2, (z0+z1)/2, (x1+x2)/2, (y1+y2)/2, (z1+z2)/2, (x0+x2)/2, (y0+y2)/2, (z0+z2)/2);
    subdivisions -= 1
    if (subdivisions > 1)
    {
        this.subCube((x0+x1)/2, (y0+y1)/2, (z0+z1)/2, (x1+x2)/2, (y1+y2)/2, (z1+z2)/2, (x0+x2)/2, (y0+y2)/2, (z0+z2)/2)
        this.subCube(x0, y0, z0, (x0 + x1)/2, (y0 + y1)/2, (z0 + z1)/2, (x0+x2)/2, (y0+y2)/2, (z0+z2)/2)
        this.subCube(x2, y2, z2, (x0+x2)/2, (y0+y2)/2, (z0+z2)/2, (x1+x2)/2, (y1+y2)/2, (z1+z2)/2)
        this.subCube(x1, y1, z1, (x1+x2)/2, (y1+y2)/2, (z1+z2)/2, (x0+x1)/2, (y0+y1)/2, (z0+z1)/2)
    }
    }
    makeCube (subdivisions)  {
        this.addTriangle(0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5)
        this.addTriangle(-0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5)
        this.addTriangle(0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5)
        this.addTriangle(-0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5)
        this.addTriangle(0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5)
        this.addTriangle(0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5)
        this.addTriangle(-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5)
        this.addTriangle(-0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5)
        this.addTriangle(0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5)
        this.addTriangle(-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5)
        this.addTriangle(0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5)
        this.addTriangle(-0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5)

        if (subdivisions > 1)
        {
            this.subCube(0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, subdivisions)
            this.subCube(-0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, subdivisions)
            this.subCube(0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, subdivisions)
            this.subCube(-0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, subdivisions)
            this.subCube(0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, subdivisions)
            this.subCube(0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, subdivisions)
            this.subCube(-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, subdivisions)
            this.subCube(-0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, subdivisions)
            this.subCube(0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, subdivisions)
            this.subCube(-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, subdivisions)
            this.subCube(0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, subdivisions)
            this.subCube(-0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, subdivisions)
        }
        // fill in your cube code here.
    }
}


class Cylinder extends cgIShape {

    constructor (radialdivision,heightdivision) {
        super();
        this.makeCylinder (radialdivision,heightdivision);
    }
    
    makeCylinder (radialdivision,heightdivision){
        // fill in your cylinder code here
            var ra = 360/radialdivision
            var ha = 1/heightdivision
            var count = ra
            var list = []
            var x1 = 0.5
            var y1 = 0
            var x = 0
            var y = 0
            console.log(radialdivision, heightdivision)
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
            this.addTriangle(0, 0, 0.5, x1, y1, 0.5, x, y, 0.5)
            this.addTriangle(0, 0, -0.5, x1, y1, -0.5, x, y, -0.5)
            var height_now = 0.5
            while (height_now>-0.499){
                this.addTriangle(x, y, height_now, x1, y1, height_now, x, y, height_now-ha)
                this.addTriangle(x1, y1, height_now, x1, y1, height_now-ha, x, y, height_now-ha)
                height_now -= ha
            }
            count = count + ra
            x1 = x
            y1 = y
            }
    }
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialdivision, heightdivision) {
    
        // Fill in your cone code here.
            var ra = 360/radialdivision
            var count = ra
            var list = []
            var x1 = 0.5
            var y1 = 0
            var x = 0
            var y = 0
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
            this.addTriangle(0, 0, -0.5, x1, y1, -0.5, x, y, -0.5)
            var dh = 1/heightdivision
            var dx1 = x1/heightdivision
            var dx = x/heightdivision
            var dy1 = y1/heightdivision
            var dy = y/heightdivision
            var nh = 0.5
            var nx1 = dx1
            var nx = dx
            var ny1 = dy1
            var ny = dy
            this.addTriangle(0, 0, 0.5, nx1, ny1, nh-dh, nx, ny, nh-dh)
            var nh = nh - dh
            while (nh > -0.499) {
                this.addTriangle(nx, ny, nh, nx1, ny1, nh, nx+dx, ny+dy, nh-dh)
                this.addTriangle(nx1, ny1, nh, nx1+dx1, ny1+dy1, nh-dh, nx+dx, ny+dy, nh-dh)
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
}
    
class Sphere extends cgIShape {

    constructor (slices, stacks) {
        super();
        this.makeSphere (slices, stacks);
    }
    
    makeSphere (slices, stacks) {
        // fill in your sphere code here
    }

}


function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

