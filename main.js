let can = document.getElementById('canvasoriginal');
let ctx = can.getContext('2d');
let contact = 10;
let dragCorner = false;
let dragAll = false;
let mouseX, mouseY;
let corte = document.getElementById('corte');
let newCtx = corte.getContext('2d');
let img = new Image();
let square = new Shape(100, 100, 100);
let xi, yi, mxi, myi;

function Shape(x, y, w){
    this.x = x ;
    this.y = y ;
    this.w = w ;
};
Shape.prototype.draw = function(cctx){
    cctx.fillStyle = 'rgba(0,0,0,0.3)';
    cctx.fillRect(this.x, this.y, this.w, this.w);
};
Shape.prototype.contains = function(mx, my){
    if ((this.x <= mx && mx < this.x+this.w) && 
        (this.y < my && my <= this.y+this.w) ){
        return true;
    }
    return false;
}

function init(){
    can.addEventListener('mousedown', mouseDown, false);
    can.addEventListener('mouseup', mouseUp, false);
    can.addEventListener('mousemove', mouseMove, false);
    corte.width = 500;
    corte.height = 500;
    img.src = './mario.jpg';
    img.onload = function(){
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
        square.draw(ctx);
        drawCorner(square.x+square.w, square.y, contact);
        drawCircle(square.x+square.w*0.5, square.y+square.w*0.5, square.w*0.5);
    };
    btn.addEventListener('click', function(){
        drawCanvasCrop();
    });
}

function mouseDown(e){
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
    xi = square.x;
    yi = square.y;
    mxi = mouseX;
    myi = mouseY;
    if(checkContactCorner(mouseX, mouseY, square.x+square.w, square.y)){
        dragCorner = true;
    }
    if(square.contains(mouseX, mouseY)){
        dragAll = true;
    }
}
function checkContactCorner(p1x, p1y, p2x, p2y){
    return (Math.abs(p1x -p2x) < contact) && (Math.abs(p1y -p2y) < contact);
}
function mouseUp(){
    dragCorner = false;
    dragAll = false;
}
function mouseMove(e){
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
    if(dragCorner){
        let arista = Math.abs(square.x - mouseX);
        square.w = arista;
        square.h = arista;
    }
    else if(dragAll){
        square.x = mouseX - ( mxi - xi );
        square.y = mouseY - ( myi - yi );
    }
    if(dragCorner || dragAll){
        drawCanvas();
        drawCanvasCrop();
    }
}

function drawCanvas(){
    let radio = square.w*0.5;
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    square.draw(ctx);
    drawCorner(square.x+square.w, square.y, contact);
    drawCircle(square.x+radio, square.y+radio, radio);
}
function drawCorner(x, y, radius){
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}
function drawCircle(x, y, radius){
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}
function drawCanvasCrop(){
    newCtx.drawImage(img, square.x, square.y, square.w, square.w, 0, 0, 500, 500);
}

init();