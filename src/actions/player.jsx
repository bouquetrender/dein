export const PlayerActionTypes = {
  PLAYERSTATE: "PLAYERSTATE"
};

export const setPlayerState = data => {
  return {
    type: PlayerActionTypes.PLAYERSTATE,
    playState: data.playState
  };
};
