import * as React from 'react'
import Controller from './Controller'
import { connect } from 'react-redux'

class Field extends React.PureComponent {
  state = {
    leftPaddleX: 0,
    rightPaddleX: 490,
    leftPaddleY: 0,
    rightPaddleY: 0,
    input: new Controller()
  }

  componentDidMount() {
    this.serve()
    this.state.input.bindKeys();
    console.log(this.state.input)
  }

  componentWillUnmount() {
    this.state.input.unbindKeys();
  }

  drawPaddles = (paddlex, paddley, ctx) => {
    var paddleHeight = 75;
    var paddleWidth = 10;
    ctx.beginPath();
    ctx.rect(paddlex, paddley, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  drawBall = (x , y, ctx) => {
    this.setState({
      ballX: x,
      ballY: y
    }, () => {
      var ballRadius = 10;
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    })
  }

  drawCanvas = (x,y) => {
    let ctx = this.refs.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    this.drawBall(x,y,ctx)
    this.drawPaddles(this.state.leftPaddleX, this.state.leftPaddleY,ctx) //left paddle
    this.drawPaddles(this.state.rightPaddleX, this.state.rightPaddleY,ctx) //right paddle
  }

  updatePaddle = (keys, side) => {
    console.log("keys")
    if(side === 'left') {
      if (keys.down && this.state.leftPaddleY < 425) {
        this.setState(
          {leftPaddleY: this.state.leftPaddleY + 8}
        )
      }
      if (keys.up && this.state.leftPaddleY > 0) {
        this.setState({leftPaddleY: this.state.leftPaddleY - 8})
      }
    } else {
      if (keys.down && this.state.rightPaddleY < 425) {
        this.setState(
          {rightPaddleY: this.state.rightPaddleY + 8}
        )
      }
      if (keys.up && this.state.rightPaddleY > 0) {
        this.setState({rightPaddleY: this.state.rightPaddleY - 8})
      }
    }
  }

  moveBall = (x,y, vx = -2, vy = 4) => {
    let interval = setInterval(() => {  
      this.drawCanvas(x, y)
      x += vx
      y += vy
      if(this.collide(x, y, vx, vy)) vx = this.bounce(vx)
      if(y >= this.refs.canvas.height || y <= 0 ) vy = this.bounce(vy)
      
      if(this.ballFlewOut(x, y)) {
        clearInterval(interval)
        this.serve()
      }
      const playersPaddle = this.props.players.find(player => player.userId === this.props.userId).paddle
      this.updatePaddle(this.state.input.pressedKeys, playersPaddle)
    }, 1000/60)
  }

  bounce = (velocity) => {
    return velocity * - 1
  }

  collide = (x, y, vx, vy) => {
    let targetPaddle
    if(vx < 0) {
      targetPaddle = 'left'
    } else {
      targetPaddle = 'right'
    }

    let collision
     if(targetPaddle === 'left') {
      collision = ((x + vx) === (this.state.leftPaddleX + 10) && (y + vy) >= this.state.leftPaddleY && (y + vy) <= (this.state.leftPaddleY + 75))
     } else {
      collision = ((x + vx) === (this.state.rightPaddleX - 10) && (y + vy) >= this.state.rightPaddleY && (y + vy) <= (this.state.rightPaddleY + 75))
     }
    return collision
  }

  ballFlewOut = (x, y) => {
    return x < 0 || x > this.refs.canvas.width
  }

  serve = () => {
    let x = this.refs.canvas.height/2
    let y = this.refs.canvas.width/2
    let vx = Math.ceil(Math.random() * -5)
    let vy = Math.ceil(Math.random() * 5)
    this.moveBall(x, y)
  }

  render() {
    return (
      <canvas
        style={{border: '1px solid #000'}} 
        ref="canvas" 
        height="500" 
        width="500" />  
    )
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games
  }
}

export default connect(mapStateToProps)(Field)