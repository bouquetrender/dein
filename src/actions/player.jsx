export const PlayerActionTypes = {
  PLAYERSTATE: "PLAYERSTATE",
  SIRIWAVE_STATE: "SIRIWAVE_STATE"
};

export const setPlayerState = data => {
  return {
    type: PlayerActionTypes.PLAYERSTATE,
    playState: data.playState
  };
};

export const setSiriWaveShowState = data => {
  return {
    type: PlayerActionTypes.SIRIWAVE_STATE,
    showSiriwave: data.showSiriwave
  };
};
