class EventBus {
  constructor() {
    this.callbacks = [];
  }

  subscribe(type, callback) {
    const event = this.findCallback(type);

    if (event) {
      event.callbacks.push(callback);
    } else {
      this.callbacks.push({ type, callback: [callback] });
    }
  }

  unSubscribe(type) {
    const eventToRemove = this.callbacks.find(
      (eventObject) => eventObject.type === type
    );

    const indexToRemove = this.callbacks.indexOf(eventToRemove);

    this.callbacks.splice(indexToRemove, 1);
  }

  post(type, args) {
    const event = this.findCallback(type);
    if (!event) {
      return;
    }

    event.callback.forEach((callback) => callback(args));
  }

  findCallback(type) {
    return this.callbacks.find((eventObject) => eventObject.type === type);
  }
}

export default new EventBus();
