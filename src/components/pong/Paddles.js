export const drawPaddles = (paddley, ctx) => {

  var paddleHeight = 75;
  var paddleWidth = 10;
  ctx.beginPath();
  ctx.rect(paddley, 0, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

export const drawBall = (x , y, ctx) => {

  var ballRadius = 10;
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}