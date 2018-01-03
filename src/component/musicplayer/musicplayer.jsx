import React, { Component } from "react"
import { connect } from "react-redux"
import { setPlayerState, setSiriWaveShowState, setSongListState } from "@/actions/player"
import { randomColor, rclength } from "@/utils/randomColor"
import SiriWave from '@/component/siriwave/siriwave'
import styles from "./musicplayer.scss"
import ReactHowler from 'react-howler'

// 本地音乐
import moreOneNight from '@/assets/mp3/moreOneNight.mp3'
import dream from '@/assets/mp3/dream.mp3'

const songList = {
  moreOneNight,
  dream
}

let interval = null

// SiriWave 组件参数
const opt = {
  width: window.innerWidth,
  height: window.innerHeight * 0.3,
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
    showSiriwave: state.IndexReducers.showSiriwave,
    showSongList: state.IndexReducers.showSongList,
  }),
  dispatch => ({
    setPlayerStateAction: data => {
      dispatch(setPlayerState(data));
    },
    setSiriWaveShowStateAction: data => {
      dispatch(setSiriWaveShowState(data));
    },
    setSongListStateAction: data => {
      dispatch(setSongListState(data));
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
    this.props.setSiriWaveShowStateAction({
      showSiriwave: !this.props.showSiriwave
    })
    this.props.setPlayerStateAction({
      playState: this.props.playState === 'pause' ? 'play' : 'pause'
    })
  }
  renderPlayOrPauseBtn = () => {
    return this.props.playState === 'pause' ?
      <div className={styles.btn + ' ' + styles.playBtn} onClick={this.handlePlayBtn}></div> :
      <div className={styles.btn + ' ' + styles.pauseBtn} onClick={this.handlePlayBtn}></div>
  }
  switchPlayList = () => {
    this.props.setSongListStateAction({
      showSongList: !this.props.showSongList
    })
  }
  // 音乐列表渲染
  songListItem = () => {
    return Object.keys(songList).map((name, index) => (
      <div
        className={styles.listSong}
        key={index}
        onClick={(event) => { event.stopPropagation(); this.handleSelectSong(name)}}
      >
        {name}
      </div>
    ))
  }
  // 选择列表音乐
  handleSelectSong = (name) => {
    console.log(name)
  }
  render() {
    const { showSiriwave, showSongList } = this.props

    return (
      <div className={styles.playerWrap} style={{background: 'linear-gradient(135deg, #bb71f3 0%, #3d4d91 100%)'}}>
        <ReactHowler
          src={songList.moreOneNight}
          playing={this.props.playState === 'play' ? true : false}
          html5={true}
        />
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
          <div className={styles.btn + ' ' + styles.playlistBtn} onClick={this.switchPlayList}></div>
          <div className={styles.btn + ' ' + styles.volumeBtn}></div>
        </div>

        <Waveform show={showSiriwave} />
        <div className={styles.progress}></div>

        <div className={styles.playlist + ' ' + (showSongList === true ? styles.showPlaylist : '')} onClick={this.switchPlayList}>
          <div className={styles.list}>
            {this.songListItem()}
          </div>
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
