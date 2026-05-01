export class StateManager {
  constructor() {
    this.state = {
      currentScene: "home",
      mode: "explore",
      selectedObject: null,
      activeSection: null
    };
    this.subscribers = [];
  }

  getState() {
    return { ...this.state };
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(callback => callback(this.getState()));
  }
}

export const stateManager = new StateManager();
