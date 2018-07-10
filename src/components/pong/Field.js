import * as React from 'react'

export default class Field extends React.PureComponent {

  componentDidMount() {
    this.moveBall()
    this.movePaddle()
  }

  moveBall = () => {
    let x = 0,
        y = 0
    let canvas = this.refs.canvas
    let ctx = canvas.getContext('2d')

    setInterval(() => {
      this.drawBall(x, y, canvas, ctx)
      x +=2
      y +=2
    }, 1000/60)
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

  drawBall = (x, y, canvas, ctx) => {
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(x,y,25,0,2*Math.PI);
    ctx.clearRect(0,0,ctx.width,ctx.height);
    ctx.fill();
  }

  bounce = (canvas, ctx) => {

  }

  drawLeftPaddle = (canvas, ctx) => {
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 20, 10, 100)
    ctx.fill()
  }

  drawRightPaddle = (canvas, ctx) => {
    ctx.fillStyle = "#000"
    ctx.fillRect(canvas.width - 10, 20, 10, 100)
    ctx.fill()
  }

  render() {
    return (
      <canvas ref="canvas" height="500" width="500" />
    )
  }
}