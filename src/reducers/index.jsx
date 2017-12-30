import { PlayerActionTypes } from "../actions/player";
import clone from "clone";

const initialState = {
  playState: 'pause',
  randomBg: false
};

const actionType = {
  [PlayerActionTypes.PLAYERSTATE]: (state, action) => {
    return {
      ...state,
      playState: action.playState
    };
  }
};

const IndexReducers = (state = initialState, action) => {
  return action.type in actionType
    ? actionType[action.type](clone(state), action)
    : state;
};

export default IndexReducers;
