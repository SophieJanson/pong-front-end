import * as React from 'react'

export default class Field extends React.PureComponent {

  componentDidMount() {
    this.moveBall()
  }

  moveBall = () => {
    let x = 0,
        y = 0

    setInterval(() => {
      this.drawBall(x, y)
      x +=2
      y +=2
    }, 1000/30)

  }

  drawBall = (x, y) => {
    let canvas = this.refs.canvas
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fill()
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(x,y,50,0,2*Math.PI);
    ctx.clearRect(0,0,ctx.width,ctx.height);
    ctx.fill();
  }
  render() {
    return (
      <canvas ref="canvas" height="500" width="500" />
    )
  }
}