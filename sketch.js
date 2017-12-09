// Keep track of our socket connection
var socket;
var img;
var pg;

function preload() {
  img = loadImage("darth.png");
}

function setup() {
  createCanvas(300, 600);
  pg = createGraphics(300, 300);

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

      pg.fill(255, 0, 0);
      pg.ellipse(mouseX, mouseY, 20, 20);
    }
  );
}

function mousePressed(){
  pg.fill(255, 0, 0);
  pg.ellipse(mouseX, mouseY, 20, 20);
  sendmouse(mouseX,mouseY);

}

function draw() {
  image(img, 0, 0, 300, 300);
  image(pg, 0, 0);
  image(pg, 0, 300);
}

function func() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
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
