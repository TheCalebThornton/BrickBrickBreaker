var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2;
var dy = -2;
var bricks = [];

var brickOptions = {
  brickRowCount: 3;
  brickColumnCount: 5;
  brickWidth: 75;
  brickHeight: 20;
  brickPadding: 10;
  brickOffsetTop: 30;
  brickOffsetLeft: 30; //figure out mathmatical scaling for centering
}

var paddleOptions = {
  ballRadius: 10;
  paddleWidth: 75;
  paddleHeight: 10;
  paddleX: (canvas.width-paddleWidth)/2;
  paddleY: (canvas.height-paddleHeight);
}

var ballOptions = {

}

function draw(){
  if(gameOver == true){
    endGame(loseText);
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

function initializeStageProperties(options = {}){
  brickOptions.brickRowCount = options.brickRowCount || 3;
  brickOptions.brickColumnCount = options.brickColumnCount || 5;
  brickOptions.brickWidth = options.brickWidth || 75;
  brickOptions.brickHeight = options.brickHeight || 20;
  brickOptions.brickPadding = options.brickPadding || 10;
  brickOptions.brickOffsetTop = options.brickOffsetTop || 30;
  brickOptions.brickOffsetLeft = options.brickOffsetLeft || 30;
  brickOptions.color = options.brickColor || "#0095DD";

  paddleOptions.ballRadius = options.ballRadius || 10;
  paddleOptions.paddleWidth = options.paddleWidth || 10;
  paddleOptions.paddleHeight = options.paddleHeight || 10;
  paddleOptions.paddleX = options.paddleX || (canvas.width-paddleOptions.paddleWidth)/2;
  paddleOptions.paddleY = options.paddleY || (canvas.height-paddleOptions.paddleHeight);
  paddleOptions.color = options.paddleColor || "#0095DD";

  ballOptions.color = options.ballColor || "#0095DD"

}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, paddleOptions.ballRadius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleOptions.paddleX, paddleOptions.paddleY,
    paddleOptions.paddleWidth, paddleOptions.paddleHeight);
  ctx.fillStyle = paddleOptions.color;
  ctx.fill();
  ctx.closePath();
}

function drawBricks(){
  for(c=0; c<brickOptions.brickColumnCount; c++) {
    for(r=0; r<brickOptions.brickRowCount; r++) {
      if(bricks[c][r].status == 1){
        var brickX = (c*(brickOptions.brickWidth+brickOptions.brickPadding))+brickOptions.brickOffsetLeft;
        var brickY = (r*(brickOptions.brickHeight+brickOptions.brickPadding))+brickOptions.brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickOptions.brickWidth, brickOptions.brickHeight);
        ctx.fillStyle = brickOptions.color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
