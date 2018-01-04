import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  setPlayerState,
  setSiriWaveShowState,
  setSongListState,
  setControlVolumeView
} from '@/actions/player'
import styles from './musicplayer.scss'
import { randomColor, rclength } from '@/utils/randomColor'
import SiriWave from '@/component/siriwave/siriwave'
import ReactHowler from 'react-howler'

// Font Awesome Icon
// https://fontawesome.com/icons
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faPause,
  faVolumeUp,
  faListUl,
  faStepBackward,
  faStepForward
} from '@fortawesome/fontawesome-free-solid'

// 本地音乐
import MoreOneNight from '@/assets/mp3/MoreOneNight.mp3'
import Dream from '@/assets/mp3/Dream.mp3'
const songList = [
  {
    title: 'More One Night',
    filename: MoreOneNight
  },
  {
    title: 'Dream',
    filename: Dream
  }
]

// 按钮组件
const playbtn = (
  <FontAwesomeIcon icon={faPlay} style={{ color: 'white', fontSize: '65px' }} />
)
const pausebtn = (
  <FontAwesomeIcon
    icon={faPause}
    style={{ color: 'white', fontSize: '65px' }}
  />
)
const volume = (
  <FontAwesomeIcon
    icon={faVolumeUp}
    style={{ color: 'white', fontSize: '30px' }}
  />
)
const listUl = (
  <FontAwesomeIcon
    icon={faListUl}
    style={{ color: 'white', fontSize: '30px' }}
  />
)
const stepBackward = (
  <FontAwesomeIcon
    icon={faStepBackward}
    style={{ color: 'white', fontSize: '40px' }}
  />
)
const stepForward = (
  <FontAwesomeIcon
    icon={faStepForward}
    style={{ color: 'white', fontSize: '40px' }}
  />
)

// 定时器
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
  render() {
    const { show } = this.props
    return (
      <React.Fragment>
        <SiriWave
          className={styles.waveformStyle + ' ' + (show ? styles.show : '')}
          opt={opt}
        />
        <div className={styles.progressBar + ' ' + (show ? '' : styles.show)} />
      </React.Fragment>
    )
  }
}

// musicplayer 音乐播放器界面控件
@connect(
  state => ({
    playState: state.IndexReducers.playState,
    showSiriwave: state.IndexReducers.showSiriwave,
    showSongList: state.IndexReducers.showSongList,
    showVolumeControlBar: state.IndexReducers.showVolumeControlBar
  }),
  dispatch => ({
    setPlayerStateAction: data => {
      dispatch(setPlayerState(data))
    },
    setSiriWaveShowStateAction: data => {
      dispatch(setSiriWaveShowState(data))
    },
    setSongListStateAction: data => {
      dispatch(setSongListState(data))
    },
    setControlVolumeViewAction: data => {
      dispatch(setControlVolumeView(data))
    }
  })
)
class musicplayer extends Component {
  static defaultVolumeValue = 1
  state = {
    color1: '#3d4d91',
    color2: '#bb71f3',
    volumeValue: 1
  }
  randomBackground = () => {
    // background: linear-gradient(135deg, ${this.state.color1} 0%, ${this.state.color2} 100%)
    interval = setInterval(() => {
      this.setState(state => {
        return {
          color1: randomColor[Math.round(Math.random() * rclength - 1)],
          color2: randomColor[Math.round(Math.random() * rclength - 1)]
        }
      })
    }, 5000)
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
    return this.props.playState === 'pause' ? (
      <div
        className={styles.btn + ' ' + styles.playBtn}
        onClick={this.handlePlayBtn}
      >
        {playbtn}
      </div>
    ) : (
      <div
        className={styles.btn + ' ' + styles.pauseBtn}
        onClick={this.handlePlayBtn}
      >
        {pausebtn}
      </div>
    )
  }
  // 音乐列表显示切换
  switchPlayList = () => {
    this.props.setSongListStateAction({
      showSongList: !this.props.showSongList
    })
  }
  // 音乐列表渲染
  songListItem = () => {
    return songList.map((item, index) => (
      <div
        className={styles.listSong}
        key={index}
        onClick={event => {
          event.stopPropagation()
          this.handleSelectSong(item)
        }}
      >
        {item.title}
      </div>
    ))
  }
  // 选择列表音乐
  handleSelectSong = item => {
    console.log(item)
  }
  // 音量调整界面显示切换
  showControlVolumeView = () => {
    this.props.setControlVolumeViewAction({
      showVolumeControlBar: !this.props.showVolumeControlBar
    })
  }
  // 调节音量
  handleSliderBtnMouseDown = () => {
    this.openSetVolume = true
  }
  handleSliderBtnMouseUp = () => {
    this.openSetVolume = false
  }
  handleVolumeViewMove = event => {
    if (this.openSetVolume) {
      event.persist()
      const clientX = event.clientX
      const startX = window.innerWidth * 0.05 // 调节音量按钮的宽度
      const layerX = clientX - startX
      const per = Math.min(1, Math.max(0, layerX / this.barEmpty.clientWidth))
      this.setState(prevState => ({
        volumeValue: per
      }))
    }
  }
  handleVolumeChange = () => {
    const { volumeValue } = this.state
    const barWidth = volumeValue * 90 / 100
    this.barFull.style.width = `${barWidth * 100}%`
    this.sliderBtn.style.left = `${window.innerWidth * barWidth +
      window.innerWidth * 0.05 -
      25}px`
  }
  render() {
    const { showSiriwave, showSongList, showVolumeControlBar } = this.props
    const { volumeValue } = this.state

    return (
      <div
        className={styles.playerWrap}
        style={{
          background: 'linear-gradient(135deg, #bb71f3 0%, #3d4d91 100%)'
        }}
      >
        <ReactHowler
          src={songList[1].filename}
          playing={this.props.playState === 'play' ? true : false}
          html5={true}
          volume={volumeValue || this.defaultVolumeValue}
          onVolume={this.handleVolumeChange}
        />
        <div className={styles.title}>
          <span />
          <div className={styles.timer}>0:00</div>
          <div className={styles.duration}>0:00</div>
        </div>

        <div className={styles.controlsOuter}>
          <div className={styles.controlsInner}>
            <div className={styles.loading} />
            {this.renderPlayOrPauseBtn()}
            <div className={styles.btn + ' ' + styles.prevBtn}>
              {stepBackward}
            </div>
            <div className={styles.btn + ' ' + styles.nextBtn}>
              {stepForward}
            </div>
          </div>
          <div
            className={styles.btn + ' ' + styles.playlistBtn}
            onClick={this.switchPlayList}
          >
            {listUl}
          </div>
          <div
            className={styles.btn + ' ' + styles.volumeBtn}
            onClick={this.showControlVolumeView}
          >
            {volume}
          </div>
        </div>

        <Waveform show={showSiriwave} />
        <div className={styles.progress} />

        <div
          className={
            styles.playlist +
            ' ' +
            (showSongList === true ? styles.showPlaylist : '')
          }
          onClick={this.switchPlayList}
        >
          <div className={styles.list}>{this.songListItem()}</div>
        </div>

        <div
          className={
            styles.volume +
            ' ' +
            (showVolumeControlBar ? styles.show : styles.fadeout)
          }
          onClick={this.showControlVolumeView}
          onMouseUp={this.handleSliderBtnMouseUp}
          onMouseMove={this.handleVolumeViewMove}
        >
          <div
            className={styles.barFull + ' ' + styles.bar}
            ref={barFull => (this.barFull = barFull)}
          />
          <div
            className={styles.barEmpty + ' ' + styles.bar}
            ref={barEmpty => (this.barEmpty = barEmpty)}
          />
          <div
            className={styles.sliderBtn}
            onMouseDown={this.handleSliderBtnMouseDown}
            ref={sliderBtn => (this.sliderBtn = sliderBtn)}
          />
        </div>
      </div>
    )
  }
  componentDidMount() {
    // this.randomBackground()
    console.log('xxxxx')
  }
  componentWillUnmount() {
    interval = null
  }
}

export default musicplayer
