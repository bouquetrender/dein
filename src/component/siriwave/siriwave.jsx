import React, { Component } from "react";
import hex2rgb from "@/utils/hex2rgb"

const waveformStyle = {
  // display: 'none',
  width: '100%',
  height: '30%',
  position: 'absolute',
  left: '0',
  top: '50%',
  margin: '-15% auto',
  cursor: 'pointer',
  opacity: '0.8',
  userSelect: 'none',
}

this.phase = 0
this.run = false

class SiriWave extends Component {
  static defaultProps = {
    // Constructor opt
    width: window.innerWidth,
    height: window.innerHeight * 0.3,
    cover: true,
    ratio: window.devicePixelRatio || 1,
    amplitude: 1,
    speed: 0.2,
    frequency: 6,
    color: '#fff'
  }
  static state = {
    // UI vars
    phase: 0,
    run: false,
    width: null,
    width_2: null,
    width_4: null,
    height: null,
    height_2: null,
    MAX: null,
    colorRGB: null,
  }

  render () {
    const { width, height } = this.state
    const { cover } = this.props

    const canvasStyle = {
      height: cover ? '100%' : `${height / ratio}px`,
      width: cover ? '100%' : `${width / ratio}px`
    }

    return (
      <div style={waveformStyle}>
        <canvas
          ref={(canvas) => {this.waveCanvasEle = canvas}}
          style={canvasStyle}
        ></canvas>
      </div>
    )
  }
  componentWillMount () {
    this.setState((state, props) => {
      return {
        width: props.ratio * (props.width || 320),
        width_2: props.width / 2,
        width_4: props.width / 4,
        height: props.ratio * (props.height || 100),
        height_2: props.height / 2,
        MAX: (props.height / 2) - 4,
        colorRGB: hex2rgb(props.color)
      }
    })
  }
  componentDidMount () {
    const ctx = this.waveCanvasEle.getContext('2d')
    console.log(ctx)
  }
}

export default SiriWave
