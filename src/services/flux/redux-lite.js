export const createStore = (reducer, initialState) => {
  let state = initialState;
  const subscribers = {};

  return {
    dispatch(action) {
      if (action && Object.prototype.hasOwnProperty.call(action, 'type')) {
        state = reducer(state, action);
        const reducerName = action.reducerName || 'default';
        subscribers[reducerName]?.forEach((cb) => cb());

        return action;
      } else if (action) {
        action(this.dispatch, this.getState);
      }
    },
    subscribe(reducerName, cb) {
      if (!subscribers[reducerName]) {
        subscribers[reducerName] = [];
      }
      subscribers[reducerName].push(cb);
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
