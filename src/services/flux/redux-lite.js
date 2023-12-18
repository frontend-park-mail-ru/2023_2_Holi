/**
 * Функция создания хранилища.
 *
 * @param {function} reducer - Редюсер для обработки экшенов и обновления состояния.
 * @param {Object} initialState - Начальное состояние хранилища.
 * @returns {Object} Хранилище с методами dispatch, subscribe, getState и clearSubscribes.
 */
export const createStore = (reducer, initialState) => {
  let state = initialState;
  let subscribers = {};

  return {
    /**
    * Очищает все подписки на изменение состояния.
    */
    clearSubscribes() {
      subscribers = {};
    },
    /**
        * Отправляет экшен для обновления состояния.
        *
        * @param {Object|function} action - Экшен для обновления состояния или функция (thunk), возвращающая экшены.
        * @returns {Object} Обработанный экшен.
        */
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
    /**
    * Подписывает колбек на изменение состояния.
    *
    * @param {string} reducerName - Имя редюсера, на изменения которого подписываемся.
    * @param {function} cb - Колбек, вызываемый при изменении состояния.
    */
    subscribe(reducerName, cb) {
      if (!subscribers[reducerName]) {
        subscribers[reducerName] = [];
      }
      subscribers[reducerName].push(cb);
    },
    /**
     * Возвращает текущее состояние хранилища.
     *
     * @returns {Object} Текущее состояние хранилища.
     */
    getState() {
      return state;
    },
  };
};
/**
 * Функция комбинирования нескольких редюсеров в один.
 *
 * @param {Object} reducers - Объект, где ключи - имена свойств состояния, а значения - редюсеры для соответствующих свойств.
 * @returns {function} Редюсер, объединяющий состояния и действия всех переданных редюсеров.
 */
export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);

      return nextState;
    }, {});
  };
};
