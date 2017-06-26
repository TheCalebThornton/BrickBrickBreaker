var winText = 'YOU WIN!';
var loseText = 'GAME OVER!'
var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = (canvas.height-paddleHeight);
var rightPressed = false;
var leftPressed = false;
var gameOver = false;
var score = 0;
//Birck Vars
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30; //figure out mathmatical scaling for centering
var bricks = [];
for(c=0; c<brickColumnCount; c++){
  bricks[c] = [];
  for(r=0; r<brickRowCount; r++){
    bricks[c][r] = {x:0, y:0, status: 1};
  }
}

function draw(){
  if(gameOver == true){
    endGame(loseText)
  }
  else{
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    movePaddle();
    checkScore();
    x += dx;
    y += dy;
    //requestAnimationFrame(draw);
  }
}

function checkScore(){
  if(score >= brickColumnCount * brickRowCount){
    endGame(winText);
  }
}

function endGame(message){
  clearInterval(intervalId);
  ctx.font="30px Verdana";
  ctx.fillText(message,canvas.width/2 - 100,canvas.height/2);
}

function movePaddle(){
  if(rightPressed && paddleX < canvas.width-paddleWidth){paddleX += 7;}
  if(leftPressed && paddleX > 0){paddleX -= 7;}
}

function collisionDetection(){
  var nextY = y + dy;
  var nextX = x + dx;
  if(nextY < ballRadius){dy = -dy;}
  //I don't really like this logic. The ball will end up going into the paddle
  else if(nextY > canvas.height - ballRadius){
    if(x > paddleX && x < paddleX + paddleWidth){dy = -dy;}//Colliding with paddle
    else{
      gameOver = true;
    }
  }
  if(nextX < ballRadius || nextX > canvas.width - ballRadius){dx = -dx;} //Left and right boundary
  checkBrickCollision();
}

function checkBrickCollision(){
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
        var brick = bricks[c][r];
        if(brickIsActive(brick)){
          if(ballTouchingBrick(brick.x, brick.y)){
            dy = -dy;
            brick.status = 0;
            score ++;
          }
        }
    }
  }
}

function ballTouchingBrick(brickX, brickY){
  return (x > brickX && x < brickX + brickWidth && y > brickY && y < brickY + brickHeight);
}

function brickIsActive(brick){
  return (brick.status == 1);
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks(){
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1){
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}


//Event Listeners/KeyBindings
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
  }
}

function keyDownHandler(e){
  if(e.keyCode == 39){rightPressed = true;}
  else if (e.keyCode == 37){leftPressed = true;}
}

function keyUpHandler(e){
  if(e.keyCode == 39){rightPressed = false;}
  else if (e.keyCode == 37){leftPressed = false;}
}


var intervalId = setInterval(draw, 10);
//draw();
