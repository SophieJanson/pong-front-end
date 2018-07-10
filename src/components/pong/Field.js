import * as React from 'react'
import { moveBall } from './Ball'

export default class Field extends React.PureComponent {
  state = {
    leftPaddleY: 20,
    rightPaddleY: 20,
  }

  componentDidMount() {
    let canvas = this.refs.canvas
    let ctx = canvas.getContext('2d')
    this.setState({
      ballX: canvas.width / 2,
      ballY: canvas.height / 2,
      leftPaddleX: 0,
      rightPaddleX: canvas.width - 10,
    }, () => {
      moveBall(canvas, ctx, this.state.ballX, this.state.ballY, this.collide, this.drawBall)
      this.movePaddle()
    })
  }

  drawBall = (x, y, canvas, ctx) => {
    this.setState({
      ballX: x,
      ballY: y
    }, () => {
      ctx.fillStyle = "#fff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
  
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(x,y,5,0,2*Math.PI);
      ctx.clearRect(0,0,ctx.width,ctx.height);
      ctx.fill();
    })
  }

  movePaddle = () => {
    let x = 0,
        y = 0
    let canvas = this.refs.canvas
    let ctx = canvas.getContext('2d')
    setInterval(() => {
      this.drawLeftPaddle(canvas, ctx)
      this.drawRightPaddle(canvas, ctx)
    }, 1000/60)
  }

  drawLeftPaddle = (canvas, ctx) => {
    ctx.fillStyle = "#000"
    ctx.fillRect(this.state.leftPaddleX, this.state.leftPaddleY, 10, 100)
    ctx.fill()
  }

  drawRightPaddle = (canvas, ctx) => {
    ctx.fillStyle = "#000"
    ctx.fillRect(this.state.rightPaddleX, this.state.rightPaddleY, 10, 100)
    ctx.fill()
  }

  collide = () => {
    const { rightPaddleX, rightPaddleY, ballX, ballY } = this.state
    console.log(rightPaddleX, ballX)
    let collision = (ballY >= rightPaddleY && ballY <= (rightPaddleY + 100) && ballX === rightPaddleX) 
    console.log(collision)
    return !!collision
  }

  render() {
    return (
      <canvas style={{border: '1px solid #000'}} ref="canvas" height="500" width="500" />
    )
  }
}