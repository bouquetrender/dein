export const PlayerActionTypes = {
  PLAYERSTATE: 'PLAYERSTATE',
  SIRIWAVE_STATE: 'SIRIWAVE_STATE',
  SONGLIST_STATE: 'SONGLIST_STATE',
  VOLUMECONTROL_STATE: 'VOLUMECONTROL_STATE'
}

export const setPlayerState = data => {
  return {
    type: PlayerActionTypes.PLAYERSTATE,
    playState: data.playState
  }
}

export const setSiriWaveShowState = data => {
  return {
    type: PlayerActionTypes.SIRIWAVE_STATE,
    showSiriwave: data.showSiriwave
  }
}

export const setSongListState = data => {
  return {
    type: PlayerActionTypes.SONGLIST_STATE,
    showSongList: data.showSongList
  }
}

export const setControlVolumeView = data => {
  return {
    type: PlayerActionTypes.VOLUMECONTROL_STATE,
    showVolumeControlBar: data.showVolumeControlBar
  }
}
