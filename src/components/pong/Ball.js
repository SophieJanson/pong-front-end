  export const moveBall = (canvas, ctx, x, y, detectCollision, drawBall) => {
    let vx = 3
    let vy = 6

    setInterval(() => {
      drawBall(x, y, ctx)
      x += vx
      y += vy
      if(detectCollision()) vx = bounce(vx)
      if(y >= canvas.height || y <= 0 ) vy = bounce(vy)
    }, 1000/60)
  }

  const bounce = (velocity) => {
    return velocity * - 1
  }