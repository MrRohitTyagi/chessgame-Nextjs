// EventEmitter.js
import EventEmitter from "eventemitter3";

export const emitter = new EventEmitter();

export const emitEvent = (eventName: string, data: any) => {
  emitter.emit(eventName, data);
};

export const listenToEvent = (eventName: string, listener: any) => {
  emitter.on(eventName, listener);
};
