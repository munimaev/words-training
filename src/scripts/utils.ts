type EventCallBack = (args: unknown) => void;

class CustomEvent {
  name: string;
  callbacks: EventCallBack[] = [];

  constructor(name: string) {
    this.name = name;
  }

  registerCallback(callback: EventCallBack) {
    this.callbacks.push(callback);
  }
}

class EventResolver {
  events: Record<string, CustomEvent> = {};

  registerEvent(eventName: string, callback?: EventCallBack) {
    const event = new CustomEvent(eventName);
    this.events[eventName] = event;
    if (callback) {
      this.addEventListener(eventName, callback);
    }
  }

  addEventListener(eventName: string, callback: EventCallBack) {
    this.events[eventName].registerCallback(callback);
  }

  dispatchEvent(eventName: string, eventArgs: unknown = null) {
    this.events[eventName].callbacks.forEach(function (callback) {
      callback(eventArgs);
    });
  }
}

export { CustomEvent, EventResolver as Reactor };

const list = [
  "apple",
  "function",
  "timeout",
  "task",
  "application",
  "data",
  "tragedy",
  "sun",
  "symbol",
  "button",
  "software",
];

export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  let current = arr.length;
  let random;

  while (current != 0) {
    random = Math.floor(Math.random() * current);
    current--;
    [result[current], result[random]] = [result[random], result[current]];
  }

  return result;
}

export function getRandomWords(count: number) {
  return shuffle(list).slice(0, count);
}

export function getRandomId(): number {
  return new Date().getTime();
}
