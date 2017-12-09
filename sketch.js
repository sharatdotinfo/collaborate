// Keep track of our socket connection
var socket;
var img;

function preload() {
  img = loadImage("darth.png");
}

function setup() {
  //createCanvas(windowWidth/2, windowHeight/2);
  //img = loadImage("darth.png");
  //image(img, 0, 0);

  img.style("opacity", 0.2);

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
}

function draw() {
  // Displays the image at its actual size at point (0,0)
    image(img, 0, 0);
    // Displays the image at point (0, height/2) at half size
    //image(img, 0, height/2, img.width/2, img.height/2);
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
