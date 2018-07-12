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
  }

  componentWillUnmount() {
    this.state.input.unbindKeys();
  }   

  drawPaddles = (paddlex, paddley, ctx) => {
    var paddleHeight = 75;
    var paddleWidth = 10;
    ctx.beginPath();
    ctx.rect(paddlex, paddley, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
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
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
    })
  }

  drawCanvas = (x,y) => {
    let ctx = this.refs.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    this.drawBall(x,y,ctx)
    this.drawPaddles(this.state.leftPaddleX, ( this.props.position && this.props.position.left) || this.state.leftPaddleY,ctx) //left paddle
    this.drawPaddles(this.state.rightPaddleX, ( this.props.position && this.props.position.right) || this.state.rightPaddleY,ctx) //right paddle
  }

  updatePaddle = (keys, side) => {
    if(side === 'left') {
      if (keys.down && this.state.leftPaddleY < 425) {
        this.setState(
          {leftPaddleY: this.state.leftPaddleY + 8}
        )
      }
      if (keys.up && this.state.leftPaddleY > 0) {
        this.setState({leftPaddleY: this.state.leftPaddleY - 8})
      }
      this.props.updatePaddlesPos(this.state.leftPaddleY, side)
    } else {
      if (keys.down && this.state.rightPaddleY < 425) {
        this.setState(
          {rightPaddleY: this.state.rightPaddleY + 8}
        )
      }
      if (keys.up && this.state.rightPaddleY > 0) {
        this.setState({rightPaddleY: this.state.rightPaddleY - 8})
      }
      this.props.updatePaddlesPos(this.state.rightPaddleY,side)
    }
  }

  addKeyEventListeners = () => {
    window.addEventListener('keyup', () => this.state.input.handleKeys(false));
    window.addEventListener('keydown', () => this.state.input.handleKeys(true));
  } 

  moveBall = (x,y, vx = -2, vy = 4) => {
    const playersPaddle = this.props.players.find(player => player.userId === this.props.userId).paddle
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
      if(this.state.input.pressedKeys.up || this.state.input.pressedKeys.down) {
        this.updatePaddle(this.state.input.pressedKeys, playersPaddle)
      }
      this.setState( {
        leftPaddleY: (this.props.position && this.props.position.left) || 0,
        rightPaddleY: (this.props.position && this.props.position.right)  || 0,
  
      })
    }, 1000/60)
  }

  bounce = (velocity) => {
    return velocity * - 1
  }

  collide = (x, y, vx, vy) => {
    let targetPaddle
    vx < 0 ? targetPaddle = 'left' : targetPaddle = 'right'
     if(targetPaddle === 'left') {
      return ((x + vx) === (this.state.leftPaddleX + 10) && (y + vy) >= this.state.leftPaddleY && (y + vy) <= (this.state.leftPaddleY + 75))
     } else {
      return ((x + vx) === (this.state.rightPaddleX - 10) && (y + vy) >= this.state.rightPaddleY && (y + vy) <= (this.state.rightPaddleY + 75))
     }
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
        className="outer-paper"
        style={{border: '1px solid #000', background: "black"}} 
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