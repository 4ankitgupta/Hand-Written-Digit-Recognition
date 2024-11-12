let canvas, ctx;
let mouseDown = false;
let pointerX, pointerY;

function init() {
    canvas = document.getElementById('sketchpad');
    resizeCanvas(); // Ensure canvas fits screen dimensions on load
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (ctx) {
        canvas.addEventListener('pointerdown', pointerDownHandler, false);
        canvas.addEventListener('pointermove', pointerMoveHandler, false);
        window.addEventListener('pointerup', pointerUpHandler, false);
    }

    // Resize canvas if the window is resized
    window.addEventListener('resize', resizeCanvas);
}

// Resize canvas dynamically to fit the mobile screen size
function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth * 0.9, 300); // Adjust to 90% of screen width up to 300px
    canvas.height = canvas.width; // Maintain square aspect ratio
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Handle pointer down event
function pointerDownHandler(e) {
    e.preventDefault(); // Prevent unintended actions like scrolling
    mouseDown = true;
    getPointerPos(e);
    draw(ctx, pointerX, pointerY, 12, false);
}

// Handle pointer move event
function pointerMoveHandler(e) {
    e.preventDefault(); // Prevent scrolling on touch devices
    getPointerPos(e);
    if (mouseDown) {
        draw(ctx, pointerX, pointerY, 12, true);
    }
}

// Handle pointer up event
function pointerUpHandler() {
    mouseDown = false;
}

// Get pointer position relative to canvas
function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    pointerX = e.clientX - rect.left;
    pointerY = e.clientY - rect.top;
}

// Draw on the canvas
function draw(ctx, x, y, size, isDragging) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

// Initialize the canvas on page load
window.onload = init;
