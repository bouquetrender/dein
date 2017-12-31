import React, { Component } from "react";
import { connect } from "react-redux";
import { setPlayerState } from "@/reducers/index";
import { randomColor, rclength } from "@/utils/randomColor";
import Wavefrom from '@/component/wavefrom/wavefrom';
import styles from "@/assets/css/musicplayer.scss";

let interval = null

@connect(
  state => {
    return {
      playState: state.IndexReducers.playState
    }
  },
  dispatch => {
    return {
      setPlayerState: data => {
        dispatch(setPlayerStateAction(data));
      }
    }
  }
)
export default class musicplayer extends Component {
  state = {
    color1: '#3d4d91',
    color2: '#bb71f3'
  }
  randomBackground () {
    // `linear-gradient(135deg, ${this.state.color1} 0%, ${this.state.color2} 100%)`
    interval = setInterval(() => {
      this.setState(state => {
        return {
          color1: randomColor[Math.round(Math.random()* rclength - 1)],
          color2: randomColor[Math.round(Math.random()* rclength - 1)]
        }
      })
    },5000)
  }
  render() {
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
            <div className={styles.btn + ' ' + styles.playBtn}></div>
            <div className={styles.btn + ' ' + styles.pauseBtn}></div>
            <div className={styles.btn + ' ' + styles.prevBtn}></div>
            <div className={styles.btn + ' ' + styles.nextBtn}></div>
          </div>
          <div className={styles.btn + ' ' + styles.playlistBtn}></div>
          <div className={styles.btn + ' ' + styles.volumeBtn}></div>
        </div>

        <div className={styles.waveform}>
          
        </div>
        <div className={styles.progressBar}></div>
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
