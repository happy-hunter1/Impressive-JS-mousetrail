// canvas trail
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
}

resizeCanvas();

let xMousePos = 0;
let yMousePos = 0;
let lastScrollLeft = 0;
let lastScrollTop = 0;
let lastX= null;
let lastY = null;
let hasMouseMoved = false;

ctx.lineWidth = 15;
ctx.strokeStyle = "rgba(255, 255, 255)";
ctx.lineCap = "round";
ctx.filter = "blur(12px)";

function drawLine(newX, newY) {
    if (lastX !== null && lastY !== null ) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(newX, newY);
        ctx.stroke();    
    }

    lastX = newX;
    lastY = newY;
}

document.addEventListener("mousemove", function(event){
    if (!hasMouseMoved){
        lastX = event.pageX;
        lastY = event.pageY;
        hasMouseMoved = true;
    } else{
        xMousePos = event.pageX;
        yMousePos = event.pageY;
        drawLine(xMousePos, yMousePos);
    }
});

window.addEventListener("scroll", function(){
    const xScrollDelta = this.window.scrollX - lastScrollLeft;
    const yScrollDelta = this.window.scrollY - lastScrollTop;

    if (xScrollDelta !== 0 || yScrollDelta !== 0) {
        xMousePos += xScrollDelta;
        yMousePos += yScrollDelta;
        drawLine(xMousePos, yMousePos)
    }

    lastScrollLeft = window.screenY;
    lastScrollTop = window.scrollX;
});

window.addEventListener("resize", resizeCanvas);
