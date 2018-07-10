import * as React from 'react'
import { drawPaddles, drawBall } from './Paddles'

export default class Field extends React.PureComponent {
  
  componentDidMount() {
    this.serve()
  }

  draw = (x,y) => {
    let canvas = this.refs.canvas
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(x,y,ctx)
    drawPaddles(0,ctx) //left paddle
    drawPaddles(400,ctx) //right paddle

  }

  serve = () => {
    let x = 0
    let y = 0
    this.moveBall(x,y)
  }

  moveBall = (x,y) => {
    let vx = 3
    let vy = 6

    setInterval(() => {
      this.draw(x, y)
      x += vx
      y += vy
      // if(collide()) {
      //   vx = this.bounce(vx)
      // } 
      if(y >= this.refs.canvas.height || y <= 0 ) {
        vy = this.bounce(vy)
      }
    }, 1000/60)
  }
 
 bounce = (velocity) => {
    return velocity * - 1
  }

  // collide = () => {
  //   const { rightPaddleX, rightPaddleY, ballX, ballY } = this.state
  //   console.log(rightPaddleX, ballX)
  //   let collision = (ballY >= rightPaddleY && ballY <= (rightPaddleY + 100) && ballX === rightPaddleX) 
  //   console.log(collision)
  //   return !!collision
  // }

  render() {
    return (
      <canvas ref="canvas" height="500" width="500" />
    )
  }
}