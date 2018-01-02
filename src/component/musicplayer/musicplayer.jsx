import React, { Component } from "react";
import { connect } from "react-redux";
import { setPlayerState, setSiriWaveShowState } from "@/actions/player";
import { randomColor, rclength } from "@/utils/randomColor";
import SiriWave from '@/component/siriwave/siriwave';
import styles from "./musicplayer.scss";

let interval = null

// SiriWave 组件参数
const opt = {
  width: window.innerWidth,
  height: (window.innerHeight + 30) * 0.3,
  cover: true,
  speed: 0.03,
  amplitude: 0.7,
  frequency: 2
}

// Waveform 界面中部动态进度条
class Waveform extends Component {
  render () {
    return this.props.show ?
      <SiriWave opt={opt} /> : <div className={styles.progressBar}></div>
  }
}

// musicplayer 音乐播放器界面控件
@connect(
  state => ({
    playState: state.IndexReducers.playState,
    showSiriwave: state.IndexReducers.showSiriwave
  }),
  dispatch => ({
    setPlayerStateAction: data => {
      dispatch(setPlayerState(data));
    },
    setSiriWaveShowStateAction: data => {
      dispatch(setSiriWaveShowState(data));
    }
  })
)
class musicplayer extends Component {
  state = {
    color1: '#3d4d91',
    color2: '#bb71f3'
  }
  randomBackground = () => {
    // background: linear-gradient(135deg, ${this.state.color1} 0%, ${this.state.color2} 100%)
    interval = setInterval(() => {
      this.setState(state => {
        return {
          color1: randomColor[Math.round(Math.random()* rclength - 1)],
          color2: randomColor[Math.round(Math.random()* rclength - 1)]
        }
      })
    },5000)
  }
  handlePlayBtn = () => {
    const status = !this.props.showSiriwave
    const playerBtnStatus = this.props.playState === 'pause' ? 'play' : 'pause'
    this.props.setSiriWaveShowStateAction({
      showSiriwave: status
    })
    this.props.setPlayerStateAction({
      playState: playerBtnStatus
    })
  }
  renderPlayOrPauseBtn = () => {
    return this.props.playState === 'pause' ?
      <div className={styles.btn + ' ' + styles.playBtn} onClick={this.handlePlayBtn}></div> :
      <div className={styles.btn + ' ' + styles.pauseBtn} onClick={this.handlePlayBtn}></div>
  }
  render() {
    const { showSiriwave } = this.props

    return (
      <div className={styles.playerWrap} style={{background: 'linear-gradient(135deg, #bb71f3 0%, #3d4d91 100%)'}}>
        <div className={styles.title}>
          <span></span>
          <div className={styles.timer}>0:00</div>
          <div className={styles.duration}>0:00</div>
        </div>

        <div className={styles.controlsOuter}>
          <div className={styles.controlsInner}>
            <div className={styles.loading}></div>
            {this.renderPlayOrPauseBtn()}
            <div className={styles.btn + ' ' + styles.prevBtn}></div>
            <div className={styles.btn + ' ' + styles.nextBtn}></div>
          </div>
          <div className={styles.btn + ' ' + styles.playlistBtn}></div>
          <div className={styles.btn + ' ' + styles.volumeBtn}></div>
        </div>

        <Waveform show={showSiriwave} />
        <div className={styles.progress}></div>

        <div className={styles.playlist}>
          <div className={styles.list}></div>
        </div>

        <div className={styles.volume + ' ' + styles.fadeout}>
          <div className={styles.barFull + ' ' + styles.bar}></div>
          <div className={styles.barEmpty + ' ' + styles.bar}></div>
          <div className={styles.sliderBtn}></div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    // this.randomBackground()
  }
  componentWillUnmount() {
    interval = null
  }
}

export default musicplayer
