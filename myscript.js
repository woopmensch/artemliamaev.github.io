var canvas = document.getElementById('canvas-main');
var ctx = canvas.getContext('2d');

var height = canvas.height = 800
var width = canvas.width = 800

var image = document.getElementById('gleb');

var roma = document.getElementById('roma');
var egor = document.getElementById('egor');
var artem = document.getElementById('artem');
var apples = [
  roma,
  egor,
  artem
]


var gachiSounds = [
  "gachisound1.mp3",
  "gachisound2.mp3",
  "gachisound3.mp3",
  "gachisound4.mp3",
  "gachisound5.mp3",
  "gachisound6.mp3",
  "gachisound7.mp3",
  "gachisound7.mp3",
];
var background = new Audio("dancinSound.mp3");
background.volume = 0.2;
// var xuy = document.getElementsById('myVideo')
// xuy.volume = 0.3


function random(min, max) {
  k = Math.floor(Math.random() * (max - min) + min);
  //to spawn correctly
  return (Math.round(k / blockSize) * blockSize)
}


var blockSize = 80;
var apple = null
var dy = 0;
var dx = 0;


function CreateSnake() {

  this.coordinates = [{
    x: 80,
    y: 80
  }];



  this.draw = function () {
    this.coordinates.forEach(drawSnakePart)
    // ctx.clearRect(this.head.x, this.head.y, blockSize, blockSize)
    // ctx.drawImage(image, this.head.x, this.head.y, blockSize, blockSize)
  };


  this.move = function () {
    this.head = {
      x: this.coordinates[0].x + dx,
      y: this.coordinates[0].y + dy
    }
    this.coordinates.unshift(this.head);
    this.coordinates.pop()

    //checking for boundaries and if true - changing direction
    if (this.head.x < 0) {
      this.head.x = width - blockSize;
    } else if (this.head.x > width - blockSize) {
      this.head.x = 0;
    } else if (this.head.y < 0) {
      this.head.y = height - blockSize;
    } else if (this.head.y > height - blockSize) {
      this.head.y = 0;
    };


    //checking for collision
    var snakePartsWithoutHead = this.coordinates.slice(1)
    for (i = 0; i < snakePartsWithoutHead.length; i++) {
      if (this.head.x === snakePartsWithoutHead[i].x && this.head.y === snakePartsWithoutHead[i].y) {
        this.death()
      }
    }
  };


  this.eat = function () {
    this.coordinates.push({
      x: snake.tail,
      y: snake.tail
    })
    eatSound = new Audio(gachiSounds[Math.floor(Math.random() * (8 - 0) + 0)])
    eatSound.play()
  }

  this.death = function () {
    alert("GAME OVER");

    dy = 0;
    dx = 0;

    apple.create()

    this.coordinates = [{
      x: 80,
      y: 80
    }];
  }
}

function drawSnakePart(snakePart) {
  // ctx.strokeStyle = "black";
  // ctx.strokeRect(snakePart.x, snakePart.y, blockSize, blockSize);
  // ctx.fillStyle = "green";
  // ctx.fillRect(snakePart.x, snakePart.y, blockSize, blockSize);
  ctx.drawImage(image, snakePart.x, snakePart.y, blockSize, blockSize);
  // ctx.drawImage(snakePart.x)
}



function CreateApple() {
  this.create = function () {
    this.x = random(0, width - blockSize);
    this.y = random(0, height - blockSize);
    this.randomName = apples[Math.floor(Math.random() * (3 - 0) + 0)]
  }
  this.draw = function () {
    // ctx.fillStyle = "red";
    // ctx.fillRect(apple.x, apple.y, blockSize, blockSize);
    // var randomName = apples[Math.floor(Math.random() * (3 - 0) + 0)]
    ctx.drawImage(this.randomName, apple.x, apple.y, blockSize, blockSize);
  }
}




var direction;
document.onkeydown = function (event) {
  event = window.event.keyCode
  switch (event) {

    case 37:
    case 65:
      if (direction != 'right') {
        direction = 'left';
        dx = -blockSize;
        dy = 0;
      }
      break;

    case 39:
    case 68:
      if (direction != 'left') {
        direction = 'right';
        dx = blockSize;
        dy = 0
      }
      break;

    case 38:
    case 87:
      if (direction != 'down') {
        direction = 'up';
        dx = 0;
        dy = -blockSize;
      }
      break;

    case 40:
    case 83:
      if (direction != 'up') {
        direction = 'down';
        dx = 0;
        dy = blockSize;
      }
      break;
  }
}



var snake = new CreateSnake()
var apple = new CreateApple()
apple.create();

setInterval(loop, 150)

function loop() {
  background.play()
  ctx.clearRect(0, 0, width, height)
  snake.move();
  apple.draw();
  snake.draw();

  for (i = 0; i < snake.coordinates.length; i++) {
    // if snake eats apple
    if (snake.coordinates[i].x === apple.x && snake.coordinates[i].y === apple.y) {
      snake.eat()
      apple.create()
    }
  }
}