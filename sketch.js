let form = document.getElementById("color");
let color = form.options[form.selectedIndex].value;

function setup() {
  let canvas = createCanvas(640, 480);
    canvas.parent('sketch')
    background(color);
}

function setColor(){
color = form.options[form.selectedIndex].value;
background(color);
}

let firstPress=1;
let dblclick=1;
let grabRadius = 10;

class Shape {
    constructor(){
        this.vertexList = [];
        this.dblclick = 1;
        this.clickedVertex = [];
        this.selectedVertex = 0;
        this.lines=[];
    }
    
    
    display() {
        
            beginShape();
            firstPress=0;
            if(this.dblclick===1){
                    vertex(mouseX,mouseY);
                }
            for (let i=0; i<this.vertexList.length; i++){
                vertex(this.vertexList[i][0],this.vertexList[i][1]);
            }
        
            for (let i=0; i<this.vertexList.length; i++){
                if (dist(this.vertexList[i][0],this.vertexList[i][1],mouseX,mouseY) < grabRadius/2 && started3===true){
//                    cursor(HAND);
                }
            }
        
            endShape(CLOSE); 
            
            
        
  }
    
    addVertex(){
        if (firstPress === 0){
            if(mouseX<width && mouseX>0 && mouseY<height && mouseY>0){
                this.vertexList.push([mouseX,mouseY]);
                this.clickedVertex.push(0);
                this.lines=[]
                this.computeLines();
            }
            
        }
        
    }
    
    editVertex(){
        this.dblclick=0;
        
        for (let i=0; i<this.vertexList.length; i++){
            
            this.mouseOnVertex(i);
            
        
        }
        
        
        this.display();
        this.lines=[]
        this.computeLines();
        
        
        
    }
    
     mouseOnVertex(i) {
         
        if (dist(this.vertexList[i][0],this.vertexList[i][1],mouseX,mouseY) < grabRadius/2){
            if(mouseIsPressed){
                        this.selectedVertex=i;
                        this.clickedVertex[i]=1;
                }
            
     }
         else{
             cursor(ARROW);
         }
         
         if (this.clickedVertex[this.selectedVertex]===1){
            this.vertexList[this.selectedVertex][0] = mouseX;
            this.vertexList[this.selectedVertex][1] = mouseY;
        }
         
         
     }
    
    computeLines(){
    for (let i=0; i<this.vertexList.length-1; i++){
        this.lines.push([this.vertexList[i][0],this.vertexList[i][1],this.vertexList[i+1][0],this.vertexList[i+1][1]]);
    }
    this.lines.push([this.vertexList[0][0],this.vertexList[0][1],this.vertexList[this.vertexList.length-1][0],this.vertexList[this.vertexList.length-1][1]]);
    }
      
    
}

class Ray {
    constructor(){
        this.dblclick = 1;
        this.initialVertex=[];
        this.finalVertex = [];
        this.initVertSet = 0;
        this.selectedInitVertex = 0;
        this.selectedFinalVertex = 0;
        this.line = [];
        this.count = [];
        this.intersectionPoints=[[]]
    }
    
    
    display() {
        
            firstPress=0;
            if(this.dblclick===1 && firstPress === 0){
                    point(mouseX,mouseY);
                }
            if (this.initVertSet === 1){
                let v0 = createVector(this.initialVertex[0],this.initialVertex[1]);
                
                if(this.dblclick===1){
                    let v1 = createVector(mouseX,mouseY);
                    this.drawArrow(v0,v1,'white');
                }
                if(this.dblclick===0){
                    let v2 = createVector(this.finalVertex[0],this.finalVertex[1])
                    let distance = sqrt((v2.y-v0.y)**2 + (v2.x-v0.x)**2);
                    this.finalVertex[0]=v0.x+50.0*(v2.x-v0.x)/distance;
                    this.finalVertex[1]=v0.y+50.0*(v2.y-v0.y)/distance;
                    v2 = createVector(this.finalVertex[0],this.finalVertex[1]);
                    this.drawArrow(v0,v2,'white');
                }
                
                if (dist(this.initialVertex[0],this.initialVertex[1],mouseX,mouseY) < grabRadius/2 && started3===true){
//                    cursor(HAND);
                }
                else if (dist(this.finalVertex[0],this.finalVertex[1],mouseX,mouseY) < grabRadius/2 && started3===true){
//                    cursor(HAND);
                }
                else if (shapes.length<2){
                    cursor(ARROW);
                }
            
            
            }
    
        
  }
    
    editRay(){
//        if(dist(this.initialVertex[0],this.initialVertex[1],mouseX,mouseY) < grabRadius/2 && this.initVertSet ===1){
//            if(mouseIsPressed){
//                        this.initialVertex[0]=mouseX;
//                        this.initialVertex[1]=mouseY;
//                }
            
            
     
        this.mouseOnVertex(); 
            
        
        this.display();
        this.line = [];
        this.computeRay();
//        count=0;
    }
    
    mouseOnVertex() {
         
            if (dist(this.initialVertex[0],this.initialVertex[1],mouseX,mouseY) < grabRadius/2){
                if(mouseIsPressed){
                        this.selectedInitVertex=1;
                }
            
     }
         
        if (this.selectedInitVertex===1){
            this.initialVertex[0] = mouseX;
            this.initialVertex[1] = mouseY;
            this.finalVertex[0] = this.finalVertex[0] - (pmouseX - mouseX);
            this.finalVertex[1] = this.finalVertex[1] - (pmouseY - mouseY);
        }
        
        if (dist(this.finalVertex[0],this.finalVertex[1],mouseX,mouseY) < grabRadius/2){
                if(mouseIsPressed){
                        this.selectedFinalVertex=1;
                }
            
     }
         
        if (this.selectedFinalVertex===1){
            this.finalVertex[0] = mouseX;
            this.finalVertex[1] = mouseY;
        }
    }
         
         
     
    
    setInitialVertex(){
        if (firstPress === 0){
            if(mouseX<width && mouseX>0 && mouseY<height && mouseY>0){
                this.initialVertex=[mouseX,mouseY];
                this.initVertSet = 1;
            }
        }
    }

    
  drawArrow(vec0, vec1, myColor) {
  push();
  stroke(myColor);
  fill(myColor);
  translate(vec0.x,vec0.y);
  rotate(atan2(vec1.y - vec0.y, vec1.x - vec0.x))
  ellipse(0,0,7,7)
  let arrowSize = 10;
  line(0,0,45, 0);
  stroke(255,255,255,80);
  line(0,0,sqrt(width**2 + height**2), 0);
  translate(50 - arrowSize,0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
    
    computeRay() {
       
        let v0 = createVector(this.initialVertex[0],this.initialVertex[1]);
        let distance; 
        let finalX; 
        let finalY; 
        
        if(this.dblclick===1){
            let v1 = createVector(mouseX,mouseY);
            distance = sqrt((v1.y-v0.y)**2 + (v1.x-v0.x)**2);
        finalX=v0.x+sqrt(width**2 + height**2)*(v1.x-v0.x)/distance;
        finalY=v0.y+sqrt(width**2 + height**2)*(v1.y-v0.y)/distance;
        }
                if(this.dblclick===0){
        let v3 = createVector(this.finalVertex[0],this.finalVertex[1])
        distance = sqrt((v3.y-v0.y)**2 + (v3.x-v0.x)**2);
        finalX=v0.x+sqrt(width**2 + height**2)*(v3.x-v0.x)/distance;
        finalY=v0.y+sqrt(width**2 + height**2)*(v3.y-v0.y)/distance;
                }
        
        this.line =[this.initialVertex[0],this.initialVertex[1],finalX,finalY];
        
    }
   
    lineLine (x1, y1, x2, y2, x3, y3, x4, y4) {
  
  // calculate the distance to intersection point
  let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

    // draw a circle where the lines meet
    let intersectionX = x1 + (uA * (x2-x1));
    let intersectionY = y1 + (uA * (y2-y1));
//    let beiX = x1 + (uA * (x2-x1));
//    let intersectionY = y1 + (uA * (y2-y1));
//    let intersectionX = x1 + (uA * (x2-x1));
//    let intersectionY = y1 + (uA * (y2-y1));
    this.intersectionPoints[this.intersectionPoints.length-1] = [intersectionX,intersectionY];
    ellipse(this.intersectionPoints[this.intersectionPoints.length-1][0],this.intersectionPoints[this.intersectionPoints.length-1][1], 10,10);
    this.intersectionPoints.push([]);
    return true;
  }
    return false;
}
    
}

let shapes = [];
shapes.push(new Shape());
let rays = [];
rays.push(new Ray());
let distLines;
let count = [];
let locked  = [false];
let xOffset = 0.0;
let yOffset = 0.0;

function draw() {
  stroke(255);
    
    if(started1){
        fill(255,255,255,50);
        background(color);
        
        
        ondblclick = function () {
            shapes[shapes.length-1].dblclick=0;
            shapes[shapes.length-1].vertexList.pop();
            shapes[shapes.length-1].lines=[];
            shapes[shapes.length-1].computeLines();
            shapes.push(new Shape());
            locked.push(false);
            for (let i=0; i<rays.length; i++){
                rays[i].count.push(0);
            }
        };
        
        rays[rays.length-1].count = new Array(shapes.length).fill(0);
        
        for (let i=0; i<shapes.length; i++){
            shapes[i].display();
        }
        
        for (let i=0; i<rays.length; i++){
                rays[i].display();
            }
        
        showIntersections(); 
      
    }
    
    
        if(started2){
            
            
            fill(255,255,255,50);
            stroke('white');
            background(color);

            ondblclick = function () {
//                rays[rays.length-1].dblclick=0;
//                rays[rays.length-1].finalVertex=[mouseX,mouseY];
//                rays.push(new Ray());
//                rays[rays.length-1].count = new Array(shapes.length).fill(0);
            };
            
            rays[rays.length-1].computeRay();
            
          
            for (let i=0; i<rays.length; i++){
                rays[i].display();
            }
            
            for (let i=0; i<shapes.length; i++){
                shapes[i].display();
        }
            
       showIntersections();     
            
      }
    
        if(started3){
            fill(255,255,255,50);
            background(color);
            
            
            for (let i=0; i<shapes.length-1; i++){
    
               if (locked[i]){
                   if (!(mouseX == pmouseX && mouseY == pmouseY)){
                       for (let j=0; j<shapes[i].vertexList.length; j++){
                           
                        shapes[i].vertexList[j][0]+=(mouseX-pmouseX)
                        shapes[i].vertexList[j][1]+=(mouseY-pmouseY)
                        shapes[i].lines = [];
                        shapes[i].computeLines();
                        for (let k=0; k<rays.length; k++){
                            rays[k].count = new Array(shapes.length).fill(0);
                        }
                        
                }
                   }  
               }
               shapes[i].editVertex();
               shapes[i].dblclick=0;
            }
        
            
            
            for (let i=0; i<rays.length; i++){
                rays[i].editRay();
            }
            
            showIntersections(); 
            
            
    }
    
    }


function draw1(){
    started1 = true;
    started2 = false;
    started3 = false;
    clear();
    background(color);
    loop();
    dblclick=1;
    firstPress=1;
}

function draw2(){
    started2 = true;
    started1 = false;
    started3 = false;
    dblclick=1;
    firstPress=1;
//    count=0;
    loop();
}

function draw3(){
    started3 = true;
    started1 = false;
    started2 = false;
//    count=0;
    loop();
}

function clearall(){
    firstPress=1;
    clear();
    background(color);
    noLoop();
    shapes=[];
    shapes.push(new Shape());
    rays=[];
    rays.push(new Ray());
}

function mousePressed(){
    
    if(started2 === true){
        rays[rays.length-1].setInitialVertex();
    }
    
    for (let i = 0; i<shapes.length; i++){
        for (let j = 0; j<shapes[i].vertexList.length; j++){
        for (let k = 0; k<rays.length; k++){  
            if (rays.length>1){
                
                if(dist(shapes[i].vertexList[j][0],shapes[i].vertexList[j][1],mouseX,mouseY) > grabRadius*5){
    if(inside([mouseX,mouseY],shapes[i].vertexList) 
       && started3 
      && (dist(mouseX,mouseY,rays[k].initialVertex[0],rays[k].initialVertex[1]) > grabRadius*5)
      && (dist(mouseX,mouseY,rays[k].finalVertex[0],rays[k].finalVertex[1]) > grabRadius*5)){
        locked[i] = true;
                }   
                }
            }
        else{
            
                if(dist(mouseX,mouseY,shapes[i].vertexList[j][0],shapes[i].vertexList[j][1]) < grabRadius){
                locked[i] = false;}
            else if(inside([mouseX,mouseY],shapes[i].vertexList) 
       && started3){
            locked[i] = true;
                }   
            }
        }
            }     
        }
        
    }
    
    


function mouseReleased(){
    if(started1 === true){
        shapes[shapes.length-1].addVertex();
    }
 
    if(started2 === true && rays[rays.length-1].initVertSet === 1){
//        if (rays[rays.length-1].initVertSet === 0){
//            rays[rays.length-1].setInitialVertex();
//            rays[rays.length-1].firstPress = 1;
//        }
       rays[rays.length-1].dblclick=0;
       rays[rays.length-1].finalVertex=[mouseX,mouseY];
                rays.push(new Ray());
                rays[rays.length-1].count = new Array(shapes.length).fill(0);
    }
    
    if(started3 === true){
        for(let i = 0; i<shapes.length; i++){
            shapes[i].clickedVertex = [];
        }
        for(let i = 0; i<rays.length; i++){
            rays[i].selectedInitVertex=0;
            rays[i].selectedFinalVertex=0;
        }
        for(let i=0; i<locked.length; i++){
        locked[i] = false;
        }
    }
    
    
    
    return false;
}



function isOdd(num) { return (num % 2 === 1);}

function sqr (x) {
  return x * x;
}

function dist2 (v, w) {
  return sqr(v[0] - w[0]) + sqr(v[1] - w[1]);
}

// p - point
// v - start point of segment
// w - end point of segment
function distToSegmentSquared (p, v, w) {
  let l2 = dist2(v, w);
  if (l2 === 0) return dist2(p, v);
  let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, [ v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1]) ]);
}

function distToSegment (p, v, w) {
  return Math.sqrt(distToSegmentSquared(p, v, w));
}

function inside(point, vs) {

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
            inside = !inside;
        }
        
    }

    return inside;
};

function showIntersections(){
            for (let i=0; i<rays.length; i++){
                for (let j=0; j<shapes.length; j++){
                    if (!inside(rays[i].initialVertex,shapes[j].vertexList)){
                    rays[i].count[j]=0;
                    
                    
                   shapes[j].lines = shapes[j].lines.sort(function (a,b){
                       return distToSegment(rays[i].initialVertex,[b[0],b[1]],[b[2],b[3]]) - distToSegment(rays[i].initialVertex,[a[0],a[1]],[a[2],a[3]]);
                       
                   });
                    
                   for (let k=0; k<shapes[j].lines.length; k++){     
                            if(isOdd(rays[i].count[j])){
                            stroke(255,0,0);
                            fill(255,0,0);
                            }
                            else{
                            stroke(0,255,0);
                            fill(0,255,0); 
                            }
                       
                       if(rays[i].lineLine(rays[i].line[0],rays[i].line[1],rays[i].line[2],rays[i].line[3],shapes[j].lines[k][0],shapes[j].lines[k][1],shapes[j].lines[k][2],shapes[j].lines[k][3])){
                           rays[i].count[j]++;
                       }
                    }
                    }
                        else{
                    rays[i].count[j]=0;
                    
                   shapes[j].lines = shapes[j].lines.sort(function (a,b){
                       return distToSegment(rays[i].initialVertex,[b[0],b[1]],[b[2],b[3]]) - distToSegment(rays[i].initialVertex,[a[0],a[1]],[a[2],a[3]]);
                       
                   });
                    
                   for (let k=0; k<shapes[j].lines.length; k++){     
                            if(isOdd(rays[i].count[j])){
                            stroke(255,0,0);
                            fill(255,0,0);
                            }
                            else{
                            stroke(0,255,0);
                            fill(0,255,0); 
                            }
                       
                       
                       if(rays[i].lineLine(rays[i].line[0],rays[i].line[1],rays[i].line[2],rays[i].line[3],shapes[j].lines[k][0],shapes[j].lines[k][1],shapes[j].lines[k][2],shapes[j].lines[k][3])){
                           rays[i].count[j]+=1;
                       }
                       
//                       for (let w=0; w<rays[i].intersectionPoints.length; w++){
//                           rays[i].count[j]+=1;
//                       }
                       
               }
                        
                
            }   
                }
        }
}
