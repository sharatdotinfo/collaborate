// Keep track of our socket connection
var socket;
var img;
var pg;

function preload() {
    img = loadImage("darth.png");
 }

function setup() {
  createCanvas(windowWidth, windowHeight/2);
  pg = createGraphics(windowWidth, windowHeight/2);

  //img = loadImage("darth.png");
  //img.opacity = 0.2;

  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('https://collaboratep5.herokuapp.com/');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(0,0,255);
      noStroke();
      ellipse(data.x,data.y,20,20);
    }
  );

  socket.on('mouse1',
    // When we receive data
    function(data) {
      console.log("Got1: " + data.x + " " + data.y);
      // Draw a blue circle
      //fill(0,0,255);
      //noStroke();
      //ellipse(data.x,data.y,20,20);

      pg.fill(0, 0, 255);
      pg.ellipse(data.x, data.y, 20, 20);
    }
  );
}

function mousePressed(){
  pg.fill(255, 0, 0);
  pg.ellipse(mouseX, mouseY, 20, 20);

  sendmouse1(mouseX,mouseY);

}

function draw() {
  // Displays the image at its actual size at point (0,0)
  image(img, 0, 0, 400, 400);
  image(pg, 0, 0);
  image(pg, 0, 400);
}

function func() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

function touchStarted() {
  // Draw some white circles
  pg.fill(255, 0, 0);
  pg.ellipse(mouseX, mouseY, 20, 20);
  // Send the mouse coordinates
  sendmouse1(mouseX,mouseY);

  return false;
}


function touchMoved() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates

  sendmouse(mouseX,mouseY);

  return false;
}

function mouseDragged() {
  func();
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}

function sendmouse1(xpos, ypos) {
  // We are sending!
  console.log("sendmouse1: " + xpos + " " + ypos);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse1',data);
}
