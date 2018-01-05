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
  shouldComponentUpdate(nextProps) {
    return this.props.show !== nextProps.show
  }
  render() {
    return (
      <React.Fragment>
        <SiriWave
          className={
            styles.waveformStyle + ' ' + (this.props.show ? styles.show : '')
          }
          opt={opt}
        />
        <div
          className={
            styles.progressBar + ' ' + (this.props.show ? '' : styles.show)
          }
        />
      </React.Fragment>
    )
  }
}

// 顶部歌曲时间信息
class TopInfo extends React.PureComponent {
  render() {
    return (
      <div className={styles.title}>
        <span />
        <div className={styles.timer}>0:00</div>
        <div className={styles.duration}>0:00</div>
      </div>
    )
  }
}

// 底部控制按钮
class ControlsBtn extends React.PureComponent {
  render() {
    return (
      <div className={styles.controlsOuter}>
        <div className={styles.controlsInner}>
          <div className={styles.loading} />
          {this.props.playState === 'pause' ? (
            <div
              className={styles.btn + ' ' + styles.playBtn}
              onClick={this.props.handlePlayBtn}
            >
              {playbtn}
            </div>
          ) : (
            <div
              className={styles.btn + ' ' + styles.pauseBtn}
              onClick={this.props.handlePlayBtn}
            >
              {pausebtn}
            </div>
          )}
          <div className={styles.btn + ' ' + styles.prevBtn}>
            {stepBackward}
          </div>
          <div className={styles.btn + ' ' + styles.nextBtn}>{stepForward}</div>
        </div>
        <div
          className={styles.btn + ' ' + styles.playlistBtn}
          onClick={this.props.switchPlayList}
        >
          {listUl}
        </div>
        <div
          className={styles.btn + ' ' + styles.volumeBtn}
          onClick={this.props.showControlVolumeView}
        >
          {volume}
        </div>
      </div>
    )
  }
}

// 播放列表菜单
class Playlist extends React.PureComponent {
  selectSong = item => {
    event.stopPropagation()
    this.props.handleSelectSong(item)
  }
  render() {
    return (
      <div
        className={
          styles.playlist +
          ' ' +
          (this.props.showSongList === true ? styles.showPlaylist : '')
        }
        onClick={this.props.switchPlayList}
      >
        <div className={styles.list}>
          {this.props.songList.map(item => (
            <div
              className={styles.listSong}
              key={item.title}
              onClick={() => {
                this.selectSong(item)
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

// 音量控制
const VolumeControlPanel = props => {
  return (
    <div
      className={
        styles.volume +
        ' ' +
        (props.showVolumeControlBar ? styles.show : styles.fadeout)
      }
      onClick={props.showControlVolumeView}
      onMouseUp={props.handleSliderBtnMouseUp}
      onMouseMove={props.handleVolumeViewMove}
    >
      {props.children}
    </div>
  )
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
  // 随机背景色
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
  // 点击播放按钮
  handlePlayBtn = () => {
    this.props.setSiriWaveShowStateAction({
      showSiriwave: !this.props.showSiriwave
    })
    this.props.setPlayerStateAction({
      playState: this.props.playState === 'pause' ? 'play' : 'pause'
    })
  }
  // 音乐列表显示切换
  switchPlayList = () => {
    this.props.setSongListStateAction({
      showSongList: !this.props.showSongList
    })
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
  // ReactHowler 修改音量回调函数
  handleVolumeChange = () => {
    const { volumeValue } = this.state
    const barWidth = volumeValue * 90 / 100
    this.barFull.style.width = `${barWidth * 100}%`
    this.sliderBtn.style.left = `${window.innerWidth * barWidth +
      window.innerWidth * 0.05 -
      25}px`
  }
  render() {
    const {
      showSiriwave,
      showSongList,
      showVolumeControlBar,
      playState
    } = this.props
    const { volumeValue } = this.state
    const wrapBg = {
      background: 'linear-gradient(135deg, #3e407b 0%, #634a90 100%)'
    }
    return (
      <div className={styles.playerWrap} style={wrapBg}>
        <ReactHowler
          src={songList[1].filename}
          playing={playState === 'play' ? true : false}
          html5={true}
          volume={volumeValue || this.defaultVolumeValue}
          onVolume={this.handleVolumeChange}
        />

        <TopInfo />

        <ControlsBtn
          handlePlayBtn={this.handlePlayBtn}
          playState={playState}
          showControlVolumeView={this.showControlVolumeView}
          switchPlayList={this.switchPlayList}
        />

        <Waveform show={showSiriwave} />
        <div className={styles.progress} />

        <Playlist
          handleSelectSong={this.handleSelectSong}
          switchPlayList={this.switchPlayList}
          showSongList={showSongList}
          songList={songList}
        />

        <VolumeControlPanel
          showVolumeControlBar={showVolumeControlBar}
          handleVolumeViewMove={this.handleVolumeViewMove}
          handleSliderBtnMouseDown={this.handleSliderBtnMouseDown}
          handleSliderBtnMouseUp={this.handleSliderBtnMouseUp}
          showControlVolumeView={this.showControlVolumeView}
        >
          <div
            className={styles.barFull + ' ' + styles.bar}
            ref={barFull => {
              this.barFull = barFull
            }}
          />
          <div
            className={styles.barEmpty + ' ' + styles.bar}
            ref={barEmpty => {
              this.barEmpty = barEmpty
            }}
          />
          <div
            className={styles.sliderBtn}
            onMouseDown={this.handleSliderBtnMouseDown}
            ref={sliderBtn => {
              this.sliderBtn = sliderBtn
            }}
          />
        </VolumeControlPanel>
      </div>
    )
  }
  componentDidMount() {
    // this.randomBackground()
  }
  componentWillUnmount() {
    interval = null
  }
}

export default musicplayer
