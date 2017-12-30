export const ActionTypes = {
  SET_DAY: "SET_DAY"
};

export const setSendMessageActions = data => {
  return {
    type: ActionTypes.SET_DAY,
    day: data.day
  };
};
