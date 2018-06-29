var winText = 'YOU WIN!';
var loseText = 'GAME OVER!'
var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2;
var dy = -2;
var rightPressed = false;
var leftPressed = false;
var gameOver = false;
var score = 0;
var bricks = [];
for(c=0; c<brickColumnCount; c++){
  bricks[c] = [];
  for(r=0; r<brickRowCount; r++){
    bricks[c][r] = {x:0, y:0, status: 1};
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


//Event Listeners/KeyBindings
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("click", mouseClickHandler, false);

function mouseMoveHandler(e){
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
  }
}

function mouseClickHandler(e){
  if() {
      //launchBall
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
