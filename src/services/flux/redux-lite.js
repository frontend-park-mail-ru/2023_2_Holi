/* eslint-disable no-undef */
export const createStore = (reducer, initialState) => {
  let state = initialState;
  let subscribers = [];

  return {
    dispatch(action) {
      if (action) {
        if (Object.prototype.hasOwnProperty.call(action, 'type')) {
          state = reducer(state, action);
          subscribers.forEach((cb) => cb());
          console.log(state);
          return action;
        }
        else {
          action(this.dispatch, this.getState);
        }
      }
    },
    subscribe(cb) {
      // eslint-disable-next-line no-const-assign
      subscribers = [...subscribers, cb];
    },
    getState() {
      return state;
    },
  };
};

export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);

      return nextState;
    }, {});
  };
};
