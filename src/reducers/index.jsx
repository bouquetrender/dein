import { PlayerActionTypes } from "../actions/player";
import clone from "clone";

const initialState = {
  playState: 'pause',
  showSiriwave: false,
  showSongList: false,
  randomBg: false
};

const actionType = {
  [PlayerActionTypes.PLAYERSTATE]: (state, action) => {
    return {
      ...state,
      playState: action.playState
    };
  },
  [PlayerActionTypes.SIRIWAVE_STATE]: (state, action) => {
    return {
      ...state,
      showSiriwave: action.showSiriwave
    };
  },
  [PlayerActionTypes.SONGLIST_STATE]: (state, action) => {
    return {
      ...state,
      showSongList: action.showSongList
    };
  }
};

const IndexReducers = (state = initialState, action) => {
  return action.type in actionType
    ? actionType[action.type](clone(state), action)
    : state;
};

export default IndexReducers;
