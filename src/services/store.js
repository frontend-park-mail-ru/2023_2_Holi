class EventEmitter {
    constructor() {
        this.events = {};
        this.state = {};
    }

    // Метод для подписки на событие
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    // Метод для вызова события с передачей данных
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach((callback) => {
                callback(data);
            });
        }
    }

    // Метод для установки значения состояния
    setState(key, value) {
        this.state[key] = value;
        this.emit(`state:${key}`, value); // Вызываем событие при изменении состояния
    }

    // Метод для получения значения состояния
    getState(key) {
        return this.state[key];
    }
}

export default new EventEmitter();
