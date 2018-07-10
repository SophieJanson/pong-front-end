import * as React from 'react'
import { drawPaddles } from './Paddles'
import { drawBall } from './Ball'

export default class Field extends React.PureComponent {

  componentDidMount() {
    this.serve()
  }

  draw = (x,y) => {

    this.paddleLeftY = 0
    this.paddleRightY = this.refs.canvas.width - 10
    let canvas = this.refs.canvas
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(x,y,ctx)
    drawPaddles(this.paddleLeftY,ctx) //left paddle
    drawPaddles(this.paddleRightY,ctx) //right paddle
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
  //   let collision = (ballY >= rightPaddleY && ballY <= (rightPaddleY + 100) && ballX === rightPaddleX) 
  //   console.log(collision)
  //   return !!collision
  // }

  render() {
    return (
      <canvas style={{border: '1px solid #000'}} ref="canvas" height="500" width="500" />
    )
  }
}